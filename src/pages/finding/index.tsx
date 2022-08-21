import { Layout } from '@/components';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  getFriendNearUser,
  getLastLocation,
  updateFriendsNearUser,
} from '@/redux/slice/mapLocationSlice';
import { useCallback, useEffect, useState } from 'react';
import { EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Swiper, SwiperSlide } from 'swiper/react';
import UserCard from './components/UserCard';
import Image from 'next/image';
import { createUserBlock } from '@/redux/slice/findingSlice';

const FindingPage = () => {
  const { friendsNearUser } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const dispatch = useAppDispatch();

  const [nearbyUsers, setNearbyUsers] = useState<IGetFriendNearUser[]>([]);

  const handleRemove = (id: string) => {
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        user.id !== id;
      }),
    );
  };
  const onLike = (id: string) => {};

  const onDislike = (id: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(createUserBlock({ blockedUserId: id }));
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };
  const onCheckInfo = (user: IUserNearby) => {};

  useEffect(() => {
    dispatch(getLastLocation());
    dispatch(getFriendNearUser());
    setNearbyUsers(friendsNearUser);
  }, [dispatch, friendsNearUser]);

  return (
    <Layout
      isLogo={false}
      title="Find stranger"
      isHeader={false}
      isFooter={true}
    >
      <div className="findingPage">
        <div className="findingPage-header">
          <h2 className="findingPage-header-brandName">Binace</h2>
          <Image
            src="/assets/images/notification-bell.svg"
            alt="bell"
            width={'20px'}
            height={'20px'}
          />
        </div>
        <Swiper
          className="findingPage-container"
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-130%', 0, -500],
            },
            next: {
              shadow: true,
              translate: ['130%', 0, -500],
            },
          }}
          modules={[EffectCreative]}
        >
          {nearbyUsers.length > 0 &&
            nearbyUsers.map((user, index) => (
              <SwiperSlide key={index} className="findingPage-container-swiper">
                <UserCard
                  user={user}
                  onLike={onLike}
                  onDislike={onDislike}
                  onCheckInfo={onCheckInfo}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Layout>
  );
};

export default FindingPage;
