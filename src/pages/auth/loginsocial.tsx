import { ICheckUserVerified } from '@/@type/services';
import { Layout } from '@/components';
import SendOTP from '@/containers/SendOTP/SendOTP';
import UpdateInfor from '@/containers/UpdateInfor/UpdateInfor';
import VerifyOtp from '@/containers/VerifyOtp/VerifyOtp';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { checkUserVerified, setIsSocial } from '@/redux/slice/userSlice';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
const loginsocail: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mystate = useAppSelector((state: RootState) => state.userSlice);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  const request: ICheckUserVerified = {
    accessToken: session?.accessToken as string,
    email: session?.user?.email as string,
    typeSocial: session?.typeSocial as string,
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch(setIsSocial(session));
    session && dispatch(checkUserVerified(request));
  }, [session]);
  if (mystate.stateSession) {
    return (
      <Layout
        isLogo={false}
        title="Login_Social"
        isFooter={false}
        isHeader={true}
      >
        <>
          {mystate.step === 1 && <UpdateInfor data={mystate.stateSession} />}
          {mystate.step === 2 && <SendOTP />}
          {mystate.step === 3 && <VerifyOtp data={mystate.stateSession} />}
        </>
      </Layout>
    );
  }
  return <></>;
};

export default loginsocail;
