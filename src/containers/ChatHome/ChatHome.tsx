import React, { FC } from 'react';
import styleCss from './ChatHome.module.scss';

import { IItemChatSlider, IItemMessageChat } from '@/@type/components';
import { Layout, ItemChatSlider, ItemMessageChat } from '@/components';

export const ChatHome: FC<IChatHome> = ({ chatSlider, conversationSlider }) => {
  return (
    <Layout title="Chat" isHeader={false} isFooter={true}>
      <div className={styleCss.chatHome}>
        <section className={styleCss.chatHome__header}>
          <h2 className={styleCss.chatHome__title}>Trò chuyện</h2>
        </section>

        <section className={styleCss.chatHome__like}>
          <h4 className={styleCss.chatHome__titleText}>Danh sách lượt thích</h4>
          <div className={styleCss.chatHome__slider}>
            {chatSlider.length !== 0 &&
              chatSlider.map((item: IItemChatSlider) => {
                return (
                  <ItemChatSlider
                    id={item.id}
                    avatar={item.avatar}
                    name={item.name}
                    key={item.id}
                  />
                );
              })}
          </div>
        </section>

        <section className={styleCss.chatHome__content}>
          <h4 className={styleCss.chatHome__titleText}>Trò chuyện</h4>
          <div className={styleCss.chatHome__list}>
            {conversationSlider.length !== 0 &&
              conversationSlider.map((conversation: IItemMessageChat) => {
                return (
                  <ItemMessageChat
                    key={conversation.conversationId}
                    conversationId={conversation.conversationId}
                    friendId={conversation.friendId}
                    avatar={conversation.avatar}
                    name={conversation.name}
                    content={conversation.content}
                    createAt={conversation.createAt}
                  />
                );
              })}
          </div>
        </section>
      </div>
    </Layout>
  );
};
