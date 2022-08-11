import React, { FC } from 'react';
import styleCss from './TitleText.module.scss';

export const TitleText: FC<ITitleText> = ({
  text,
  textColor,
  color,
  textRemaining,
  style,
}) => (
  <article className={styleCss.titleText} style={style}>
    <span className={styleCss.titleText__text}>{text}</span>
    {textColor && (
      <span
        className={`${styleCss[`titleText__${color}`]} ${
          styleCss.titleText__text
        }`}
      >
        {textColor}{' '}
      </span>
    )}
    {textRemaining && (
      <span className={styleCss.titleText__text}>{textRemaining}</span>
    )}
  </article>
);
