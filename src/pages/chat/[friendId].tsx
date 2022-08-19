import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useCallback, useRef } from 'react';

import { ChatContent } from '@/containers';

import chatApi from '../../services/chat.api';

const ChatContentPage: NextPage = () => {
  const router = useRouter();
  const { friendId } = router.query;
  const url = process.env.NEXT_PUBLIC_SOCKET_URL ?? '';

  const [conversationId, setConversationId] = useState<string>('');
  const [infoFriend, setInfoFriend] = useState<IUserFriend>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [contentChat, setContentChat] = useState<string>('');

  const userId = '975f0925-ff12-498e-b3ca-8ecdef0a4ae9';
  const socketRef = useRef<Socket>();

  // Init Socket
  useEffect(() => {
    socketRef.current = io(url, {
      query: {
        userId,
        friendId,
      },
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  console.log('socketId: ', socketRef);

  // Received Message
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('message-received', (data: IMessage) => {
        console.log('data: ', data);
        setMessages([data, ...messages]);
      });
    }
  }, [messages]);

  // Handle Click Chat
  const handleClick = (e: any) => {
    e.preventDefault();

    if (contentChat && socketRef.current) {
      const messageRequest: IMessageSend = {
        socketId: socketRef.current.id,
        senderId: userId,
        conversationId: conversationId,
        content: contentChat,
      };

      setContentChat('');
      socketRef.current.emit('send-message', messageRequest);
    }
  };

  // Get List Conversation Message
  const getConversation = useCallback(() => {
    if (friendId) {
      chatApi
        .getConversationsByUserIdAndFriendId(friendId as string)
        .then((data) => {
          if (data.status) {
            setConversationId(data.data.id);
          }
        });
    }
  }, [friendId]);

  // Get List Friends
  const getFriendInfo = useCallback(() => {
    if (friendId) {
      chatApi.getFriendByUserIdAndFriendId(friendId as string).then((data) => {
        if (data.status) {
          setInfoFriend({ ...{}, ...data.data });
        } else {
          router.push('/chat');
        }
      });
    }
  }, [friendId, router]);

  // Get List Message Of Conversation
  const getListMessage = useCallback(() => {
    if (conversationId) {
      chatApi
        .getMessageByConversationId(conversationId as string)
        .then((data) => {
          if (data.status) {
            setMessages([...[], ...data.data]);
          }
        });
    }
  }, [conversationId]);

  useEffect(() => {
    getConversation();
    getFriendInfo();
  }, [getConversation, getFriendInfo]);

  useEffect(() => {
    getListMessage();
  }, [getListMessage]);

  return infoFriend ? (
    <ChatContent
      infoFriend={infoFriend}
      messages={messages}
      contentChat={contentChat}
      setContentChat={setContentChat}
      handleClick={handleClick}
      userId={userId}
    />
  ) : (
    <></>
  );
};

export default ChatContentPage;
