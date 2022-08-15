import React, { FC } from 'react';
import styleCss from './ItemMessageChat.module.scss';

import Link from 'next/link';
import Image from 'next/image';

export const ItemMessageChat: FC<IItemMessageChat> = ({
  avatar,
  name,
  message,
  time,
}) => {
  return (
    <Link href={'/#'}>
      <a>
        <div className={styleCss.itemMessageChat}>
          <Image
            src={avatar}
            width={48}
            height={48}
            alt="Avatar"
            className={styleCss.itemMessageChat__img}
          />
          <div className={styleCss.itemMessageChat__content}>
            <h4 className={styleCss.itemMessageChat__name}>{name}</h4>
            <p className={styleCss.itemMessageChat__message}>{message}</p>
          </div>
          <p className={styleCss.itemMessageChat__date}>{time}</p>
        </div>
      </a>
    </Link>
  );
};
