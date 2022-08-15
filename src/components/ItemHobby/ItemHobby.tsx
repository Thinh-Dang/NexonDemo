import { IItemHobby } from '@/@type/components';
import { FC } from 'react';
import styleCss from './ItemHobby.module.scss';

export const ItemHobby: FC<IItemHobby> = ({ title, color }) => {
  return (
    <div className={styleCss.itemHobby} style={{ backgroundColor: color }}>
      <h4 className={styleCss['itemHobby-title']}>#{title}</h4>
    </div>
  );
};
