import React, { FC } from 'react';
import styleCss from './ChatContent.module.scss';

import 'moment/locale/vi';
import moment from 'moment';
import Image from 'next/image';

import { typeItemContentChat } from '@/common/enums/enum';
import {
  Navigation,
  InfoUserChat,
  ItemContentChat,
  Layout,
} from '@/components';

export const ChatContent: FC<IChatContent> = ({
  infoFriend,
  messages,
  contentChat,
  setContentChat,
  handleClick,
  userId,
}) => {
  return (
    <Layout title="Chat Content" isHeader={false} isFooter={false}>
      <section className={styleCss.chatContent}>
        <Navigation />
        <InfoUserChat
          avatar={infoFriend.avatar}
          title={infoFriend.name}
          content={`Đã kết đôi ${moment(infoFriend.createAt)
            .locale('vi')
            .startOf('hour')
            .fromNow()}`}
        />
        <section className={styleCss.chatContent__content}>
          {messages.length !== 0 &&
            messages.map((message: IMessage) => {
              return (
                <ItemContentChat
                  key={message.id}
                  time={`${moment(message.createAt).format('LT')}, ${moment(
                    message.createAt,
                  ).format('LL')}`}
                  content={message.content}
                  type={
                    userId === message.senderId
                      ? typeItemContentChat.YOU
                      : typeItemContentChat.FRIEND
                  }
                />
              );
            })}
        </section>
        <section className={styleCss.chatContent__func}>
          <button className={styleCss.chatContent__btn}>
            <Image
              src="/assets/images/add-gift.svg"
              width={24}
              height={24}
              alt="Add"
            />
          </button>
          <form className={styleCss.chatContent__form} onSubmit={handleClick}>
            <input
              type="text"
              className={styleCss.chatContent__input}
              placeholder="Aa"
              value={contentChat}
              onChange={(e) => setContentChat(e.target.value)}
            />
            <div className={styleCss.chatContent__emoji}>
              <Image
                src="/assets/images/emoji.svg"
                width={24}
                height={24}
                alt="Emoji"
              />
            </div>
          </form>
          <button
            className={styleCss.chatContent__btn}
            type="button"
            onClick={handleClick}
          >
            <Image
              src="/assets/images/send-message.svg"
              width={36}
              height={36}
              alt="Send Message"
            />
          </button>
        </section>
      </section>
    </Layout>
  );
};
