import { IInfoItem } from '@/@type/components';
import { FC } from 'react';
import { ArrowRightIcon } from '../icon';
import styleCss from './InfoItem.module.scss';

export const InfoItem: FC<IInfoItem> = ({ icon, title, value }) => {
  return (
    <div className={styleCss.infoItem}>
      <div className={styleCss['infoItem-spacing']}>
        {icon}
        <h4 className={styleCss['infoItem-title']}>{title}</h4>
      </div>
      <div className={styleCss['infoItem-spacing']}>
        <span className={styleCss['infoItem-value']}>{value}</span>
        <div className={styleCss['infoItem-arrowLeft']}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};
