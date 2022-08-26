import React, { useCallback, useEffect, useState } from 'react';
import styleCss from './Protected.module.scss';

import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { getProfile } from '@/redux/slice/userSlice';
import { useAppSelector, RootState, useAppDispatch } from '@/redux';
import Image from 'next/image';

interface IProtected {
  children: React.ReactNode;
}

export const Protected = ({ children }: IProtected) => {
  const router = useRouter();
  const location = router.pathname;
  const dispatch = useAppDispatch();
  const [isFetch, setIsFetch] = useState(false);
  const myState = useAppSelector((state: RootState) => state.userSlice);

  const fetchInfo = useCallback(async () => {
    const check = (await dispatch(getProfile())).payload;

    if (check) {
      setIsFetch(true);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
    setIsFetch(false);
  }, [myState.isLogin]);

  if (isMobile) {
    if (!isFetch) {
      return <></>;
    }

    if (
      !myState.isLogin &&
      location !== '/auth/login' &&
      location !== '/' &&
      location !== '/auth/loginsocial' &&
      location !== '/auth/loginsocial#_='
    ) {
      router.push('/');
      return <></>;
    }

    if (location === '/auth/login' && myState.step === 0) {
      router.push('/');
      return <></>;
    }

    if (
      myState.isLogin &&
      (location === '/' ||
        location === '/auth/login' ||
        location === '/auth/loginsocial' ||
        location === '/auth/loginsocial#_=')
    ) {
      router.push('/finding');
      return <></>;
    }

    return <>{children}</>;
  }

  return (
    <div className={styleCss.protected}>
      <div>
        <h1>CẢNH BÁO THIẾT BỊ</h1>
        <p>Website chỉ hoạt động trên thiết bị mobile. Cảm ơn !!!</p>
      </div>
      <Image
        src="/assets/images/device_warning.png"
        width={'400px'}
        height={'400px'}
        alt="device warning image"
      />
    </div>
  );
};
