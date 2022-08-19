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
    chatApi.getListFriends().then((data) => {
      if (data.status) {
        setChatSlider([...[], ...data.data]);
      }
    });

    chatApi.getConversationsByUserId().then((data) => {
      if (data.status) {
        setConversationSlider([...[], ...data.data]);
      }
    });
  }, []);

  return (
    <ChatHome chatSlider={chatSlider} conversationSlider={conversationSlider} />
  );
};

export default ChatPage;
