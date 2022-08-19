import { IItemHobby } from '@/@type/components';
import Image from 'next/image';
import { FC, useCallback, useRef } from 'react';
import styleCss from './ItemHobby.module.scss';

export const ItemHobby: FC<IItemHobby> = ({
  title,
  color,
  value,
  icon,
  onIconClick,
}) => {
  //const ref = useRef<HTMLDivElement>(null);
  const handleClick = useCallback(() => {
    if (typeof onIconClick === 'function' && value) {
      onIconClick(value);

      // if (ref.current) {
      //   ref.current.hidden = true;
      // }
    }
  }, []);

  return (
    <div
      className={styleCss.itemHobby}
      style={{ backgroundColor: color }}
      //ref={ref}
    >
      <h4 className={styleCss['itemHobby-title']}>#{title}</h4>
      {icon ? (
        <div className={styleCss['itemHobby-icon']} onClick={handleClick}>
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
