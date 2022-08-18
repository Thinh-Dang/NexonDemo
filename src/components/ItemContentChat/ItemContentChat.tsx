import React, { FC } from 'react';
import styleCss from './ItemContentChat.module.scss';

export const ItemContentChat: FC<IItemContentChat> = ({
  time,
  content,
  type,
}) => {
  return (
    <div className={styleCss.itemContentChat}>
      {type === 'you' && (
        <div className={styleCss.itemContentChat__friend}>
          {time && (
            <section className={styleCss.itemContentChat__time}>
              <p className={styleCss.itemContentChat__date}>{time}</p>
            </section>
          )}

          <section className={styleCss.itemContentChat__contentFriend}>
            <p className={styleCss.itemContentChat__textFriend}>{content}</p>
          </section>
        </div>
      )}

      {type === 'friend' && (
        <div className={styleCss.itemContentChat__you}>
          <section className={styleCss.itemContentChat__contentYou}>
            <p className={styleCss.itemContentChat__textYou}>{content}</p>
          </section>
        </div>
      )}
    </div>
  );
};
