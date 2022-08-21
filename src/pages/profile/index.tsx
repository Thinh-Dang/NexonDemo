import { Profile } from '@/containers';
import { NextPage } from 'next';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { useEffect } from 'react';
import { getUserProfile } from '@/redux/slice/userProfileSlice';
import { getPurposes } from '@/redux/slice/purposeSlice';
import { Layout } from '@/components';

const ProfilePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userProfileSlice);
  const purposes = useAppSelector((state: RootState) => state.purposeSlice);

  useEffect(() => {
    if (!profile.avatar) {
      dispatch(getUserProfile());
    }

    if (purposes.length === 0) {
      dispatch(getPurposes());
    }
  }, []);

  return (
    <Layout title={'Trang cá nhân'} isHeader={false} isFooter={true}>
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
