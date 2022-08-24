import { ISectionTitle } from '@/@type/components';
import { FC, useCallback } from 'react';
import styleCss from './SectionTitle.module.scss';

export const SectionTitle: FC<ISectionTitle> = ({
  title,
  editTitle,
  marginBottom,
  settingType,
  onEditClick,
}) => {
  const handleClick = useCallback(() => {
    if (typeof onEditClick === 'function' && settingType) {
      onEditClick(settingType);
    }
  }, []);

  return (
    <div
      className={styleCss.sectionTitle}
      style={{ marginBottom: marginBottom + 'px' }}
    >
      <h4 className={styleCss.sectionTitle__title}>{title}</h4>
      {editTitle ? (
        <h4 className={styleCss.sectionTitle__editTitle} onClick={handleClick}>
          {editTitle}
        </h4>
      ) : null}
    </div>
  );
};
