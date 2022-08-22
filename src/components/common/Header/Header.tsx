import React, { FC } from 'react';
import styleScss from './Header.module.scss';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux';
import { resetIsGetPhone } from '@/redux/slice/userSlice';

import inconHeader from '../../../../public/assets/back-icon.svg';
import { IHeader } from '@/@type/components';
import { signOut, useSession } from 'next-auth/react';

export const Header: FC<IHeader> = ({ isLogo }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className={styleScss.header}>
      {isLogo ? (
        <h2 className={styleScss.header__title}>Tinder</h2>
      ) : (
        <div style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
          <button
            onClick={() => {
              if (session) {
                signOut();
              }
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
