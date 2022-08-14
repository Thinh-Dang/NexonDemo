import React from 'react';
import styleCss from './ChatHome.module.scss';

import { Layout, TitleHeader } from '@/components';

export const ChatHome = () => {
  return (
    <Layout title="Chat" isHeader={false} isFooter={false}>
      <section className={styleCss.chatHome}>
        <h2 className={styleCss.chatHome__h2}>Trò chuyện</h2>
        <p className={styleCss.chatHome__text}>Danh sách lượt thích</p>
      </section>
    </Layout>
  );
};
