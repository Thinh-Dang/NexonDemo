import React, { FC } from 'react';
import styleCss from './ItemMessageChat.module.scss';

import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

import { IItemMessageChat } from '@/@type/components';

export const ItemMessageChat: FC<IItemMessageChat> = ({
  conversationId,
  friendId,
  avatar,
  name,
  content,
  createAt,
}) => {
  return (
    <Link href={`/chat/${friendId}`} key={conversationId}>
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
            <p className={styleCss.itemMessageChat__message}>{content}</p>
          </div>
          <p className={styleCss.itemMessageChat__date}>
            {moment(createAt).startOf('hour').fromNow()}
          </p>
        </div>
      </a>
    </Link>
  );
};
