import React, { FC } from 'react';
import styleCss from './ItemMessageChat.module.scss';

import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { IItemMessageChat } from '@/@type/components';

export const ItemMessageChat: FC<IItemMessageChat> = ({
  conversationId,
  friendId,
  avatar,
  name,
  content,
  createAt,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`chat/${friendId}`);
  };

  return (
    <div
      className={styleCss.itemMessageChat}
      onClick={handleClick}
      key={conversationId}
    >
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
        {moment(createAt).fromNow()}
      </p>
    </div>
  );
};
