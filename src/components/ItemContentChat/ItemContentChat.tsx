import React, { FC } from 'react';
import styleCss from './ItemContentChat.module.scss';

import Image from 'next/image';
import { IItemContentChat } from '@/@type/components';

export const ItemContentChat: FC<IItemContentChat> = ({
  id,
  time,
  content,
  image,
  type,
}) => {
  return (
    <div className={styleCss.itemContentChat} key={id}>
      <div className={styleCss[`itemContentChat__${type}`]}>
        {time && content && (
          <section className={styleCss.itemContentChat__time}>
            <p className={styleCss.itemContentChat__date}>{time}</p>
          </section>
        )}

        {content && (
          <section
            className={
              styleCss[
                `itemContentChat__content${
                  type.charAt(0).toUpperCase() + type.slice(1)
                }`
              ]
            }
          >
            <p
              className={
                styleCss[
                  `itemContentChat__text${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  }`
                ]
              }
            >
              {content}
            </p>
          </section>
        )}

        {image && (
          <section
            className={
              styleCss[
                `itemContentChat__image${
                  type.charAt(0).toUpperCase() + type.slice(1)
                }`
              ]
            }
          >
            <Image
              src={image}
              width={200}
              height={200}
              alt="Message"
              className={styleCss.itemContentChat__image}
            />
          </section>
        )}
      </div>
    </div>
  );
};
