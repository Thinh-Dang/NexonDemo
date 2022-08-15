import { NextPage } from 'next';

import { Layout } from '@/components';
import { ChatContent } from '@/containers';

const ChatContentPage: NextPage = () => {
  return (
    <Layout title="Chat Content" isHeader={false} isFooter={false}>
      <ChatContent />
    </Layout>
  );
};

export default ChatContentPage;
