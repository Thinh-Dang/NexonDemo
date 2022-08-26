import React from 'react';
import styleScss from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styleScss.loading}>
      <h2 className={styleScss.loading__title}>Tinai</h2>
    </div>
  );
};
