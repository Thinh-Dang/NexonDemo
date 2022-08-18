import React from 'react';
import styleScss from './Content.module.scss';

const Content = ({ contentTitle, contentText, classContent }: IContent) => {
  return (
    <div className={classContent}>
      <h3>{contentTitle}</h3>
      <p className={styleScss.contentText}>{contentText}</p>
    </div>
  );
};

export default Content;
