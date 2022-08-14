import React from 'react';
import styleCss from './TitleHeader.module.scss';

export const TitleHeader = () => {
  return (
    <section className={styleCss.titleHeader}>
      <h2 className={styleCss.titleHeader__text}>Trò Chuyện</h2>
    </section>
  );
};
