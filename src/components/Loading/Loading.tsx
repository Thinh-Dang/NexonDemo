import React from 'react';
import styleScss from './Loading.module.scss';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className={styleScss.loading}>
      <h1 className={styleScss.loading__title}>Tinher</h1>
    </div>
  );
};

export default Loading;
