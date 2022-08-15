import React from 'react';
import styleCss from './ChatContent.module.scss';

import Image from 'next/image';
import { typeItemContentChat } from '@/common/enums/enum';
import { Navigation, InfoUserChat, ItemContentChat } from '@/components';

export const ChatContent = () => {
  return (
    <section className={styleCss.chatContent}>
      <Navigation />
      <InfoUserChat
        avatar="/assets/images/avatar.svg"
        title="Cameron Greer, 1"
        content="Đã kết đôi 3 tuần trước"
      />
      <section className={styleCss.chatContent__content}>
        <ItemContentChat
          time="20:00, 16 tháng 8 năm 2022"
          content="Hello, Em ăn cơm chưa?"
          type={typeItemContentChat.FRIEND}
        />
        <ItemContentChat
          content="Hello, Em ăn cơm chưa?"
          type={typeItemContentChat.YOU}
        />
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
        <form className={styleCss.chatContent__form}>
          <input
            type="text"
            className={styleCss.chatContent__input}
            placeholder="Aa"
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
        <button className={styleCss.chatContent__btn}>
          <Image
            src="/assets/images/send-message.svg"
            width={36}
            height={36}
            alt="Send Message"
          />
        </button>
      </section>
    </section>
  );
};
