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
    <Layout
      header={
        <HeadPage
          hTag={HTag.h2}
          title={'Tài khoản'}
          icon={<SettingIcon />}
          colorTitle={Color.clr_neutral_100}
          onIconClick={() => {
            alert('hello');
          }}
        />
      }
      title={'Hello'}
    >
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
