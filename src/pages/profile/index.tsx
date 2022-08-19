import { Profile } from '@/containers';
import { NextPage } from 'next';
import { useAppDispatch } from '@/redux';
import { HeadPage, Layout } from '@/components';
import { useEffect } from 'react';
import { Color, HTag } from '@/common/enums/enum';
import { SettingIcon } from '@/components/icon';
import { getUserProfile } from '@/redux/slice/userProfileSlice';

const ProfilePage: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <Layout title={'Trang cá nhân'} islogo={false}>
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
