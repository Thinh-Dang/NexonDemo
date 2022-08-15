import { ISectionTitle } from '@/@type/components';
import { FC } from 'react';
import styleCss from './SectionTitle.module.scss';

export const SectionTitle: FC<ISectionTitle> = ({
  title,
  editTitle,
  marginBottom,
}) => {
  return (
    <div
      className={styleCss.sectionTitle}
      style={{ marginBottom: marginBottom + 'px' }}
    >
      <h4 className={styleCss['sectionTitle-title']}>{title}</h4>
      {editTitle ? (
        <h4 className={styleCss['sectionTitle-editTitle']}>{editTitle}</h4>
      ) : null}
    </div>
  );
};
