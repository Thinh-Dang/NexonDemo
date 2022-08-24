import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import chatApi from '../../services/chat.api';
import { useSocket } from '@/contexts/useSocket';
import { useAppSelector, RootState } from '@/redux';

import { UploadFile } from 'antd';
import { ChatContent } from '@/containers';
import type { UploadProps } from 'antd/es/upload';

const ChatContentPage: NextPage = () => {
  const router = useRouter();
  const socket = useSocket();
  const { friendId } = router.query;
  const userId = useAppSelector(
    (state: RootState) => state.userSlice.inforUser.id,
  );

  const [conversationId, setConversationId] = useState<string>('');
  const [infoFriend, setInfoFriend] = useState<IUserFriend>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [contentChat, setContentChat] = useState<string>('');
  const [fileImage, setFileImage] = useState<UploadFile[]>([]);

  console.log('re render', new Date());

  // Handle Change Image
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImage(newFileList);
  };

  // Handle Upload Image
  const handleUploadImage = () => {
    if (fileImage.length !== 0 && socket) {
      const image: IImageMessage = {
        fieldname: 'file',
        originalname: fileImage[0].name,
        encoding: '7bit',
        mimetype: fileImage[0].type,
        buffer: fileImage[0].originFileObj,
        size: fileImage[0].size,
      };

      const messageRequest: IMessageSend = {
        socketId: socket.id,
        senderId: userId,
        friendId: friendId as string,
        conversationId: conversationId,
        content: '',
        image,
      };

      setFileImage([]);
      socket.emit('send-message', messageRequest);
    }
  };

  // Received Message
  useEffect(() => {
    if (socket) {
      socket.on('message-received', (data: IMessage) => {
        setMessages([data, ...messages]);
      });
    }

    return () => {
      socket.off('message-received');
    };
  }, [messages]);

  // Handle Click Chat
  const handleClick = (e: any) => {
    e.preventDefault();

    if (contentChat && socket && friendId) {
      const messageRequest: IMessageSend = {
        socketId: socket.id,
        senderId: userId,
        friendId: friendId as string,
        conversationId: conversationId,
        content: contentChat,
      };

      setContentChat('');
      socket.emit('send-message', messageRequest);
    }
  };

  // Get Conversation
  const getConversation = useCallback(async () => {
    if (friendId) {
      const dataInfoFriend = await chatApi.getFriendByUserIdAndFriendId(
        friendId as string,
      );

      const dataChat = await chatApi.getConversationsByUserIdAndFriendId(
        friendId as string,
      );

      if (dataChat.status) {
        setConversationId(dataChat.data.id);
        setMessages([...[], ...dataChat.data.messages]);
      }

      if (dataInfoFriend.status) {
        setInfoFriend({ ...{}, ...dataInfoFriend.data });
      } else {
        router.push('/chat');
      }
    }
  }, []);

  useEffect(() => {
    getConversation();
  }, [getConversation]);

  return infoFriend ? (
    <ChatContent
      infoFriend={infoFriend}
      messages={messages}
      contentChat={contentChat}
      setContentChat={setContentChat}
      handleClick={handleClick}
      userId={userId}
      fileImage={fileImage}
      handleChange={handleChange}
      handleUploadImage={handleUploadImage}
    />
  ) : (
    <></>
  );
};

export default ChatContentPage;
