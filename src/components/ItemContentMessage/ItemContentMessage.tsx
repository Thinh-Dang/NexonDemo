import React from 'react';
import styleCss from './ItemContentMessage.module.scss';

import Image from 'next/image';

export const ItemContentMessage = ({
  direction,
  name,
  content,
  time,
  avatar = 'https://bootdey.com/img/Content/avatar/avatar1.png',
}: IItemContentMessage) => {
  return (
    <div className={`${styleCss[`itemContentMessage__${direction}`]}`}>
      <div>
        <Image
          src={avatar}
          className="rounded-circle mr-1"
          alt={name}
          width={40}
          height={40}
        />
        <div className="text-muted small text-nowrap mt-2">{time}</div>
      </div>
      <div
        className={`flex-shrink-1 bg-light rounded ${styleCss.itemContentMessage__body}`}
      >
        <div className={styleCss.itemContentMessage__name}>{name}</div>
        <p className={`${styleCss[`itemContentMessage__${direction}`]}`}>
          {content}
        </p>
      </div>
    </div>
  );
};
