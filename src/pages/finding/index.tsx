import { Card, Layout } from '@/components';
import UserDetail from '@/components/Finding/UserDetail';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  createUserBlock,
  createUserLikeStack,
} from '@/redux/slice/findingSlice';
import {
  getFriendNearUser,
  getLastLocation,
} from '@/redux/slice/mapLocationSlice';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Swiper, SwiperSlide } from 'swiper/react';
import UserCard from './components/UserCard';
import { IUserNearby } from '@/@type/redux';

const FindingPage = () => {
  const { friendsNearUser } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [nearbyUsers, setNearbyUsers] = useState<IGetFriendNearUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IGetFriendNearUser>();
  const onOverlayClick = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.classList.remove('popup');
      overlay.classList.remove('overlay-show');

      setTimeout(() => {
        card.hidden = true;
        overlay.hidden = true;
      }, 1000);
    }
  }, []);

  const openPopUp = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.hidden = false;
      overlay.hidden = false;

      setTimeout(() => {
        overlay.classList.add('overlay-show');
        card.classList.add('popup');
      }, 10);
    }
  }, []);
  const onLike = (id: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(createUserLikeStack({ toUserId: id }));
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };

  const onDislike = (id: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(createUserBlock({ blockedUserId: id }));
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };
  const onCheckInfo = (user: IGetFriendNearUser) => {
    setSelectedUser(user);
  };

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
          {nearbyUsers.length > 0 ? (
            nearbyUsers.map((user, index) => (
              <SwiperSlide key={index} className="findingPage-container-swiper">
                <UserCard
                  user={user}
                  onLike={onLike}
                  onDislike={onDislike}
                  onCheckInfo={onCheckInfo}
                  onInfoClick={openPopUp}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div
                className="findingPage-cardEmpty"
                style={{
                  backgroundImage: `url('./assets/images/empty-finding.jpg')`,
                }}
              >
                <div className="findingPage-card-empty">
                  <p className="findingPage-card-empty-content">
                    Oops , no one's around
                  </p>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <Card
          hasCloseBtn={true}
          onCloseCard={onOverlayClick}
          height={'93vh'}
          ref={cardRef}
        >
          {selectedUser && (
            <UserDetail
              user={selectedUser}
              onLike={onLike}
              onDislike={onDislike}
            />
          )}
        </Card>
        <div
          className="overlay"
          hidden
          onClick={onOverlayClick}
          ref={overlayRef}
        ></div>
      </div>
    </Layout>
  );
};

export default FindingPage;
