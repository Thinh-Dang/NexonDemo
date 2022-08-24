import { Layout } from '@/components';
import SendOTP from '@/containers/SendOTP/SendOTP';
import UpdateInfor from '@/containers/UpdateInfor/UpdateInfor';
import VerifyOtp from '@/containers/VerifyOtp/VerifyOtp';
import { RootState, useAppSelector } from '@/redux';
import { NextPage } from 'next';

const login: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mystate = useAppSelector((state: RootState) => state.userSlice);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Layout
      isLogo={false}
      title="Login_Phone"
      isFooter={false}
      isHeader={mystate.isHeader}
    >
      <>
        {mystate.step === 1 && <SendOTP />}
        {mystate.step === 2 && <VerifyOtp />}
        {mystate.step === 3 && <UpdateInfor />}
      </>
    </Layout>
  );
};

export default login;
