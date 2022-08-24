import React, { useCallback, useEffect, useState } from 'react';
import styleCss from './Protected.module.scss';

import { Alert } from 'antd';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { getProfile } from '@/redux/slice/userSlice';
import { useAppSelector, RootState, useAppDispatch } from '@/redux';

interface IProtected {
  children: React.ReactNode;
}

export const Protected = ({ children }: IProtected) => {
  const router = useRouter();
  const location = router.pathname;
  const dispatch = useAppDispatch();
  const [isFetch, setIsFetch] = useState(false);
  const isLogin = useAppSelector((state: RootState) => state.userSlice.isLogin);

  const fetchInfo = useCallback(async () => {
    const check = (await dispatch(getProfile())).payload;

    if (check) {
      setIsFetch(true);
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      fetchInfo();
    } else {
      setIsFetch(true);
    }
  }, []);

  if (isMobile) {
    if (!isFetch) {
      return <></>;
    }

    if (!isLogin && location !== '/auth/login' && location !== '/') {
      router.push('/');
      return <></>;
    }

    if (isLogin && (location === '/auth/login' || location === '/')) {
      router.push('/finding');
      return <></>;
    }

    return <>{children}</>;
  }

  return (
    <div className={styleCss.protected}>
      <Alert
        message="CẢNH BÁO THIẾT BỊ"
        description="Website chỉ hoạt động trên thiết bị mobile. Cảm ơn !!!"
        type="error"
        showIcon
      />
    </div>
  );
};
