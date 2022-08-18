import { ISettingInfor } from '@/@type/components';
import { FC, useCallback } from 'react';
import { ArrowRightIcon } from '../icon';
import styleCss from './SettingInfor.module.scss';

export const SettingInfo: FC<ISettingInfor> = ({
  title,
  content,
  onIconClick,
  type,
}) => {
  const handleClick = useCallback(() => {
    onIconClick(type);
  }, []);

  return (
    <div className={styleCss.settingInfo}>
      <div>
        <h3 className={styleCss['settingInfo-title']}>{title}</h3>
        <span className={styleCss['settingInfo-content']}>{content}</span>
      </div>
      <div className={styleCss['settingInfo-icon']} onClick={handleClick}>
        <ArrowRightIcon />
      </div>
    </div>
  );
};
