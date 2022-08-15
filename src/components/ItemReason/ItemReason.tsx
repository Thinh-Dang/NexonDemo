import { IItemReason } from '@/@type/components';
import { FC } from 'react';
import styleCss from './ItemReason.module.scss';
import Image from 'next/image';

export const ItemReason: FC<IItemReason> = ({
  icon,
  title,
  subTitle,
  checked,
  onChange,
  value,
}) => {
  return (
    <div className={styleCss.itemReason}>
      <div className={styleCss['itemReason-content']}>
        <div>
          <Image width={48} height={48} alt="icon" src={icon} />
        </div>
        <div>
          <h4 className={styleCss['itemReason-content-title']}>{title}</h4>
          <p className={styleCss['itemReason-content-subTitle']}>{subTitle}</p>
        </div>
      </div>
      <input
        name="reason"
        type="radio"
        defaultChecked={checked}
        value={value}
        onChange={(e) => {
          console.log(e.target);
          console.log(e.target.checked);
        }}
        className={styleCss['itemReason-radio']}
      />
    </div>
  );
};
