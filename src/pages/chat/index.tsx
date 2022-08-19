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
      .getListFriends('975f0925-ff12-498e-b3ca-8ecdef0a4ae9')
      .then((data) => {
        if (data.status) {
          setChatSlider([...[], ...data.data]);
        }
      });

    chatApi
      .getConversationsByUserId('975f0925-ff12-498e-b3ca-8ecdef0a4ae9')
      .then((data) => {
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
