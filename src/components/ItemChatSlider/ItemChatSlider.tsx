import React, { FC } from 'react';
import styleCss from './ItemChatSlider.module.scss';

import Image from 'next/image';
import Link from 'next/link';

export const ItemChatSlider: FC<IItemChatSlider> = ({ id, avatar, name }) => {
  return (
    <Link href={`/chat/${id}`}>
      <a>
        <div className={styleCss.itemChatSlider} key={id}>
          <Image
            className={styleCss.itemChatSlider__img}
            src={avatar}
            width={90}
            height={90}
            alt={name}
          />
          <div className={styleCss.itemChatSlider__content}>{name}</div>
        </div>
      </a>
    </Link>
  );
};
