import React from 'react';
import styleScss from './Loading.module.scss';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className={styleScss.loading}>
      <h2 className={styleScss.loading__title}>Tinher</h2>
    </div>
  );
};

export default Loading;
