import React, { FC } from 'react';
import styleCss from './ItemChatSlider.module.scss';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { IItemChatSlider } from '@/@type/components';

export const ItemChatSlider: FC<IItemChatSlider> = ({ id, avatar, name }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`chat/${id}`);
  };

  return (
    <div className={styleCss.itemChatSlider} key={id} onClick={handleClick}>
      <Image
        className={styleCss.itemChatSlider__img}
        src={avatar}
        width={90}
        height={90}
        alt={name}
      />
      <div className={styleCss.itemChatSlider__content}>{name}</div>
    </div>
  );
};
