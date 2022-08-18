import { Layout } from '@/components';
import SendOTP from '@/containers/SendOTP/SendOTP';
import UpdateInfor from '@/containers/UpdateInfor/UpdateInfor';
import VerifyOtp from '@/containers/VerifyOtp/VerifyOtp';
import { RootState, useAppSelector } from '@/redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const login: NextPage = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const infoUser = useAppSelector((state: RootState) => state.userSlice);

  return (
    <Layout islogo={false} title="Login_Phone" isFooter={false} isHeader={true}>
      <>
        {!infoUser.phone && <SendOTP />}
        {infoUser.isGetPhone && infoUser.phone && !infoUser.isLogin && (
          <VerifyOtp />
        )}
        {infoUser.isLogin && <UpdateInfor />}
      </>
    </Layout>
  );
};

export default login;
