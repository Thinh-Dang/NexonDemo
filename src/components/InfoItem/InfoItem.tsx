import { IInfoItem } from '@/@type/components';
import { FC, useCallback } from 'react';
import { ArrowRightIcon } from '../icon';
import styleCss from './InfoItem.module.scss';

export const InfoItem: FC<IInfoItem> = ({
  icon,
  title,
  value,
  onIconClick,
  type,
}) => {
  const handlleClick = useCallback(() => {
    onIconClick(type);
  }, []);

  return (
    <div className={styleCss.infoItem} onClick={handlleClick}>
      <div className={styleCss.infoItem__spacing}>
        {icon}
        <h4 className={styleCss.infoItem__title}>{title}</h4>
      </div>
      <div className={styleCss.infoItem__spacing}>
        <span className={styleCss.infoItem__value}>{value}</span>
        <div className={styleCss.infoItem__arrowLeft}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};
