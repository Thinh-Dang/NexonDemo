import React, { FC } from 'react';
import styleScss from './Header.module.scss';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux';
import { resetIsGetPhone } from '@/redux/slice/userSlice';

import { IHeader } from '@/@type/components';
import inconHeader from '../../../../public/assets/back-icon.svg';

export const Header: FC<IHeader> = ({ isLogo }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className={styleScss.header}>
      {isLogo ? (
        <h2 className={styleScss.header__title}>Tinder</h2>
      ) : (
        <div style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
          <button
            onClick={() => {
              dispatch(resetIsGetPhone());
              router.back();
            }}
          >
            <Image src={inconHeader} alt="arrow pic" />
          </button>
        </div>
      )}
    </div>
  );
};
