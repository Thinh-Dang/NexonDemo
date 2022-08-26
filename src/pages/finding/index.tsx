import { useCallback, useEffect, useRef, useState } from 'react';
import { EffectCreative } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';

import Image from 'next/image';
import MatchPage from '../matching';
import { NotifyContainer } from '@/containers';
import { IItemNotify } from '../../@type/components';
import { Card, Layout, UserCard } from '@/components';
import UserDetail from '@/components/Finding/UserDetail';

import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { createUserBlock } from '@/redux/slice/userBlockSlice';
import {
  getFriendNearUser,
  getLastLocation,
  updateFriendInfo,
} from '@/redux/slice/mapLocationSlice';
import {
  createUserLikeStack,
  deleteUserLikeStacks,
  getMatchingFriends,
} from '@/redux/slice/userLikeStackSlice';

import { useSocket } from '@/contexts/useSocket';
import notificationApi from '../../services/notification.api';

const FindingPage = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const cardRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const matchingRef = useRef<HTMLDivElement>(null);

  const { friendsNearUser } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const { matching } = useAppSelector(
    (state: RootState) => state.userLikeStackSlice,
  );

  const [nearbyUsers, setNearbyUsers] = useState<IGetFriendNearUser[]>([]);
  const [idSelected, setIdSelected] = useState<string | null>();
  const [notifications, setNotifications] = useState<IItemNotify[]>([]);

  const onOverlayClick = useCallback(() => {
    if (notifyRef.current && !notifyRef.current.hidden) {
      notifyRef.current.classList.remove('notifyShow');
    }

    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.classList.remove('popup');
      overlay.classList.remove('overlay-show');
    }
    setIdSelected(null);
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

  const openNotify = () => {
    if (notifyRef.current && overlayRef.current) {
      const overlay = overlayRef.current;

      notifyRef.current.hidden = false;
      notifyRef.current.classList.add('notifyShow');
    }
  };

  const openMatchPagePopUp = useCallback(() => {
    if (matchingRef.current) {
      const matching = matchingRef.current;

      matching.hidden = false;

      setTimeout(() => {
        matching.classList.add('show');
      }, 10);
    }
  }, []);

  const closeMatchPagePopUp = useCallback(() => {
    if (matchingRef.current) {
      const match = matchingRef.current;
      const ids = matching.map((el) => el.id);
      ids.length && dispatch(deleteUserLikeStacks({ ids: ids }));
      match.classList.remove('show');
      return;
    }
  }, []);

  const onLike = (id: string) => {
    dispatch(createUserLikeStack({ toUserId: id }));
    socket.emit('send-notification', id);
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };

  const onDislike = (id: string) => {
    dispatch(createUserBlock({ blockedUserId: id }));
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };

  const onCheckInfo = (user: IGetFriendNearUser) => {
    dispatch(updateFriendInfo(user));
    setIdSelected(user.id);
  };

  const getNotification = async () => {
    const notifications = await notificationApi.getNotificationByUserId();

    if (notifications.status) {
      setNotifications(notifications.data);
    }
  };

  useEffect(() => {
    dispatch(getFriendNearUser());
    dispatch(getLastLocation());
    dispatch(getMatchingFriends());
    matching?.length && openMatchPagePopUp();
    getNotification();
  }, []);

  useEffect(() => {
    setNearbyUsers(friendsNearUser);
  }, [friendsNearUser]);

  useEffect(() => {
    if (socket) {
      socket.on('notification-received', (data: IItemNotify) => {
        setNotifications([...notifications, data]);
      });

      return () => {
        socket.off('notification-received');
      };
    }
  }, [notifications]);

  return (
    <Layout
      isLogo={false}
      title="Find stranger"
      isHeader={false}
      isFooter={true}
    >
      <div className="findingPage">
        <div className="findingPage-header">
          <h2 className="findingPage-header-brandName">Tinher</h2>
          <Image
            onClick={openNotify}
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
                    Oops , no one&apos;s around
                  </p>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <Card
          hasCloseBtn={true}
          onCloseCard={onOverlayClick}
          height={'90vh'}
          ref={cardRef}
        >
          {idSelected && (
            <UserDetail
              id={idSelected}
              onLike={onLike}
              onDislike={onDislike}
              onCloseModal={onOverlayClick}
            />
          )}
        </Card>
        <NotifyContainer
          ref={notifyRef}
          height={'100vh'}
          onCloseCard={onOverlayClick}
          notifications={notifications}
        />
        <div
          className="overlay"
          hidden
          onClick={onOverlayClick}
          ref={overlayRef}
        ></div>
        <MatchPage
          matching={matching}
          matchingRef={matchingRef}
          openMatchPagePopUp={openMatchPagePopUp}
          closeMatchPagePopUp={closeMatchPagePopUp}
        />
      </div>
    </Layout>
  );
};

export default FindingPage;
