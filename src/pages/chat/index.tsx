import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { ChatHome } from '@/containers';
import { IItemChatSlider, IItemMessageChat } from '@/@type/components';

import chatApi from '../../services/chat.api';

const ChatPage: NextPage = () => {
  const [chatSlider, setChatSlider] = useState<IItemChatSlider[]>([]);
  const [conversationSlider, setConversationSlider] = useState<
    IItemMessageChat[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    chatApi.getListFriends().then((data) => {
      if (data.status) {
        setChatSlider([...[], ...data.data]);
      }
      setIsLoading(false);
    });

    chatApi.getConversationsByUserId().then((data) => {
      if (data.status) {
        setConversationSlider([...[], ...data.data]);
      }
    });
  }, []);

  return (
    <ChatHome
      chatSlider={chatSlider}
      conversationSlider={conversationSlider}
      isLoading={isLoading}
    />
  );
};

export default ChatPage;
