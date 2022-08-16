/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styleScss from './Header.module.scss';
// eslint-disable-next-line import/extensions
import Image from 'next/image';
import inconHeader from '../../../../public/assets/back-icon.svg';

type Props = {
  isLogo: boolean;
};

const Header = ({ isLogo }: Props) => {
  return (
    <div className={styleScss.header}>
      {isLogo ? (
        <h2 className={styleScss.header__title}>Tinder</h2>
      ) : (
        <div style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
          <Image src={inconHeader} alt="arrow pic" />
        </div>
      )}
    </div>
  );
};

export default Header;
