import React, { FC } from 'react';
import styleCss from './ChatHome.module.scss';

import { useRouter } from 'next/router';
import Spinning from '@/components/Spinning/Spinning';
import { IItemChatSlider, IItemMessageChat } from '@/@type/components';
import { Layout, ItemChatSlider, ItemMessageChat } from '@/components';

export const ChatHome: FC<IChatHome> = ({
  chatSlider,
  conversationSlider,
  isLoading,
}) => {
  const router = useRouter();
  return (
    <Layout title="Chat" isHeader={false} isFooter={true}>
      <div className={styleCss.chatHome}>
        <section className={styleCss.chatHome__header}>
          <h2 className={styleCss.chatHome__title}>Trò chuyện</h2>
        </section>
        {!isLoading ? (
          chatSlider.length !== 0 ? (
            <>
              <section className={styleCss.chatHome__like}>
                <h4 className={styleCss.chatHome__titleText}>
                  Danh sách bạn bè
                </h4>
                <div className={styleCss.chatHome__slider}>
                  {chatSlider.map((item: IItemChatSlider) => {
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
            </>
          ) : (
            <section style={{ marginBottom: '30vh' }}>
              <img src="./assets/images/empty_chat.svg" />
              <p style={{ textAlign: 'center', marginTop: '5rem' }}>
                Chưa có bạn bè <br />
                <button
                  onClick={() => router.push('/map')}
                  style={{
                    padding: '.7rem 4rem',
                    borderRadius: '.8rem',
                    backgroundColor: '#cabbff',
                    color: '#9b63ff',
                    marginTop: '1rem',
                  }}
                >
                  Tìm kiếm ngay
                </button>
              </p>
            </section>
          )
        ) : (
          <div
            className="spinning-container"
            style={{
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Spinning />
          </div>
        )}
      </div>
    </Layout>
  );
};
