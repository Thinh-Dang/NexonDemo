import { IItemHobby } from '@/@type/components';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import styleCss from './ItemHobby.module.scss';

export const ItemHobby: FC<IItemHobby> = ({
  title,
  color,
  value,
  icon,
  onIconClick,
}) => {
  const handleClick = useCallback(() => {
    if (typeof onIconClick === 'function' && value) {
      onIconClick(value);
    }
  }, []);

  return (
    <div className={styleCss.itemHobby} style={{ backgroundColor: color }}>
      <h4 className={styleCss.itemHobby__title}>#{title}</h4>
      {icon ? (
        <div className={styleCss.itemHobby__icon} onClick={handleClick}>
          <Image
            src={icon ?? '/assets/Clove.svg'}
            height={5}
            width={5}
            layout="responsive"
            alt="icon"
          />
        </div>
      ) : null}
    </div>
  );
};
