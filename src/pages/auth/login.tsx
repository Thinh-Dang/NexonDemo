import { Layout } from '@/components';
import SendOTP from '@/containers/SendOTP/SendOTP';
import UpdateInfor from '@/containers/UpdateInfor/UpdateInfor';
import VerifyOtp from '@/containers/VerifyOtp/VerifyOtp';
import { RootState, useAppSelector } from '@/redux';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const login: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mystate = useAppSelector((state: RootState) => state.userSlice);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout
        isLogo={false}
        title="Login_Social"
        isFooter={false}
        isHeader={true}
      >
        <>
          {!mystate.inforUser.email && <UpdateInfor data={session} />}
          {mystate.inforUser.email && !mystate.isVerifyOtp && (
            <SendOTP data={session} />
          )}
          {mystate.isSocial && mystate.isVerifyOtp && (
            <VerifyOtp data={session} />
          )}
        </>
      </Layout>
    );
  }

  return (
    <Layout isLogo={false} title="Login_Phone" isFooter={false} isHeader={true}>
      <>
        {!mystate.phone && <SendOTP />}
        {mystate.isGetPhone && mystate.phone && !mystate.isVerifyOtp && (
          <VerifyOtp />
        )}
        {mystate.isVerifyOtp && <UpdateInfor />}
      </>
    </Layout>
  );
};

export default login;
