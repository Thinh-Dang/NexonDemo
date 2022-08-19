import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { ChatHome } from '@/containers';
import chatApi from '../../services/chat.api';

const ChatPage: NextPage = () => {
  const [chatSlider, setChatSlider] = useState<IItemChatSlider[]>([]);
  const [conversationSlider, setConversationSlider] = useState<
    IItemMessageChat[]
  >([]);

  useEffect(() => {
    chatApi
      .getListFriends('33734a5e-596d-44f3-9fb8-84800ac4b9c8')
      .then((data) => setChatSlider([...[], ...data.data]));

    chatApi
      .getConversationsByUserId('33734a5e-596d-44f3-9fb8-84800ac4b9c8')
      .then((data) => setConversationSlider([...[], ...data.data]));
  }, []);

  return (
    <ChatHome chatSlider={chatSlider} conversationSlider={conversationSlider} />
  );
};

export default ChatPage;
