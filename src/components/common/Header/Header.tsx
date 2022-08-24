import React, { FC } from 'react';
import styleScss from './Header.module.scss';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { resetState } from '@/redux/slice/userSlice';

import inconHeader from '../../../../public/assets/back-icon.svg';
import { IHeader } from '@/@type/components';
import { signOut } from 'next-auth/react';

export const Header: FC<IHeader> = ({ isLogo }) => {
  const mystate = useAppSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const location = router.pathname;
  const myRouter = () => {
    if (location === '/auth/login') {
      if (mystate.step === 1) {
        router.push('/');
        dispatch(resetState());
      } else {
        dispatch(resetState());
      }
    } else if (
      location === '/auth/loginsocial' ||
      location === 'auth/loginsocial#_=_'
    ) {
      if (mystate.step === 1) {
        signOut({ callbackUrl: '/' });
      } else if (mystate.isEmailVerify) {
        dispatch(resetState());
        router.push('/');
      } else {
        dispatch(resetState());
      }
    } else {
      router.back();
    }
  };
  return (
    <div className={styleScss.header}>
      {isLogo ? (
        <h2 className={styleScss.header__title}>Tinder</h2>
      ) : (
        <div style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
          <button onClick={myRouter}>
            <Image src={inconHeader} alt="arrow pic" />
          </button>
        </div>
      )}
    </div>
  );
};
