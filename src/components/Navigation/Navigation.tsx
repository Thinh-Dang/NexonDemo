import React from 'react';
import styleCss from './Navigation.module.scss';

import Image from 'next/image';

export const Navigation = () => {
  return (
    <div className={styleCss.navigation}>
      <button className={styleCss.navigation__btn}>
        <Image
          src="/assets/images/left.svg"
          width={40}
          height={40}
          alt="left"
        />
      </button>
      <button className={styleCss.navigation__btn}>
        <Image
          src="/assets/images/more.svg"
          width={40}
          height={40}
          alt="more"
        />
      </button>
    </div>
  );
};
