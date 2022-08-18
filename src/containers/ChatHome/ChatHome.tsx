import React from 'react';
import styleCss from './ChatHome.module.scss';

import { Layout, ItemChatSlider, ItemMessageChat } from '@/components';

export const ChatHome = () => {
  return (
    <Layout title="Chat" isHeader={false} isFooter={true}>
      <div className={styleCss.chatHome}>
        <section className={styleCss.chatHome__header}>
          <h2 className={styleCss.chatHome__title}>Trò chuyện</h2>
        </section>

        <section className={styleCss.chatHome__like}>
          <h4 className={styleCss.chatHome__titleText}>Danh sách lượt thích</h4>
          <div className={styleCss.chatHome__slider}>
            <ItemChatSlider img="/assets/frog.jpg" name="Anh kiem" />
            <ItemChatSlider img="/assets/frog.jpg" name="Anh kiem" />
            <ItemChatSlider img="/assets/frog.jpg" name="Anh kiem" />
            <ItemChatSlider img="/assets/frog.jpg" name="Anh kiem" />
            <ItemChatSlider img="/assets/frog.jpg" name="Anh kiem" />
          </div>
        </section>

        <section className={styleCss.chatHome__content}>
          <h4 className={styleCss.chatHome__titleText}>Trò chuyện</h4>
          <div className={styleCss.chatHome__list}>
            <ItemMessageChat
              avatar="/assets/images/avatar.svg"
              name="Anh Kiem"
              message="Alo alo alo"
              time="04:20 AM"
            />
            <ItemMessageChat
              avatar="/assets/images/avatar.svg"
              name="Anh Kiem"
              message="Alo alo alo"
              time="04:20 AM"
            />
            <ItemMessageChat
              avatar="/assets/images/avatar.svg"
              name="Anh Kiem"
              message="Alo alo alo"
              time="04:20 AM"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};
