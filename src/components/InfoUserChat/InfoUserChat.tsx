import React, { FC } from 'react';
import styleCss from './InfoUserChat.module.scss';

import Image from 'next/image';

export const InfoUserChat: FC<IInfoUserChat> = ({ avatar, title, content }) => {
  return (
    <div className={styleCss.infoUserChat}>
      <section className={styleCss.infoUserChat__logo}>
        <div className={styleCss.infoUserChat__avatar}>
          <Image
            src={avatar ?? '/assets/images/avatar.svg'}
            width={48}
            height={48}
            alt="Avatar"
          />
        </div>
        <div className={styleCss.infoUserChat__heart}>
          <Image
            src="/assets/images/heart.svg"
            width={24}
            height={24}
            alt="Heart"
          />
        </div>
      </section>
      <section className={styleCss.infoUserChat__content}>
        <p className={styleCss.infoUserChat__title}>{title}</p>
        <p className={styleCss.infoUserChat__info}>{content}</p>
      </section>
      <section className={styleCss.infoUserChat__right}>
        <button className={styleCss.infoUserChat__btn}>
          <Image
            src="/assets/images/button.svg"
            width={24}
            height={24}
            alt="button"
          />
        </button>
      </section>
    </div>
  );
};
