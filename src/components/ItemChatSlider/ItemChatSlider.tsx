import React, { FC } from 'react';
import styleCss from './ItemChatSlider.module.scss';

import Image from 'next/image';

export const ItemChatSlider: FC<IItemChatSlider> = ({ img, name }) => {
  return (
    <div className={styleCss.itemChatSlider}>
      <Image
        className={styleCss.itemChatSlider__img}
        src={img}
        width={90}
        height={90}
        alt=""
      />
      <div className={styleCss.itemChatSlider__content}>{name}</div>
    </div>
  );
};
