import { FC } from 'react';
import styleCss from './Label.module.scss';

export const Label: FC<ILabel> = ({ htmlFor, content, style }) => (
  <label className={styleCss.label} htmlFor={htmlFor} style={style}>
    {content}
  </label>
);
