import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useCallback, useRef } from 'react';

import { Layout } from '@/components';
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

  const userId = '33734a5e-596d-44f3-9fb8-84800ac4b9c8';
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

  // Received Message
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('message-received', (data: IMessage) => {
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
        .getConversationsByUserIdAndFriendId(userId, friendId as string)
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
      chatApi
        .getFriendByUserIdAndFriendId(userId, friendId as string)
        .then((data) => {
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
    getListMessage();
  }, [getConversation, getFriendInfo, getListMessage]);

  return (
    <Layout title="Chat Content" isHeader={false} isFooter={false}>
      {infoFriend ? (
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
      )}
    </Layout>
  );
};

export default ChatContentPage;
