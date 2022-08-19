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
    <div className={styleCss.infoItem}>
      <div className={styleCss['infoItem-spacing']}>
        {icon}
        <h4 className={styleCss['infoItem-title']}>{title}</h4>
      </div>
      <div className={styleCss['infoItem-spacing']}>
        <span className={styleCss['infoItem-value']}>{value}</span>
        <div className={styleCss['infoItem-arrowLeft']} onClick={handlleClick}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};
