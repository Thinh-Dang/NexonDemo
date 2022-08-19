import { IHeaderPage } from '@/@type/components';
import { HTag } from '@/common/enums/enum';
import { FC } from 'react';
import styleCss from './HeadPage.module.scss';

export const HeadPage: FC<IHeaderPage> = ({
  hTag,
  title,
  icon,
  colorTitle,
  onIconClick,
}) => {
  return (
    <div className={styleCss.headPage}>
      <div>
        {hTag === HTag.h3 ? (
          <h2
            className={styleCss.headPage__title}
            style={{ color: colorTitle }}
          >
            {title}
          </h2>
        ) : (
          <h3
            className={styleCss.headPage__title}
            style={{ color: colorTitle }}
          >
            {title}
          </h3>
        )}
      </div>
      {icon ? (
        <div className={styleCss.headPage__icon} onClick={onIconClick}>
          {icon}
        </div>
      ) : null}
    </div>
  );
};
