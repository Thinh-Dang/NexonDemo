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
      <div className={styleCss.itemReason__content}>
        <div>
          <Image
            width={48}
            height={48}
            alt="icon"
            src={icon ?? '/assets/images/default.jpg'}
          />
        </div>
        <div>
          <h4 className={styleCss.itemReason__content__title}>{title}</h4>
          <p className={styleCss.itemReason__content__subTitle}>{subTitle}</p>
        </div>
      </div>
      {checked ? (
        <input
          name="reason"
          type="radio"
          defaultChecked
          value={value}
          onChange={onChange}
          className={styleCss.itemReason__radio}
        />
      ) : (
        <input
          name="reason"
          type="radio"
          value={value}
          onChange={onChange}
          className={styleCss.itemReason__radio}
        />
      )}
    </div>
  );
};
