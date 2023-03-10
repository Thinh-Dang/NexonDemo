import { useCallback, useEffect, useRef, useState } from 'react';
import { EffectCreative } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';

import Image from 'next/image';
import MatchPage from '../matching';
import { NotifyContainer } from '@/containers';
import UserDetail from '@/components/Finding/UserDetail';
import { Card, Layout, UserCard } from '@/components';

import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { createUserBlock } from '@/redux/slice/userBlockSlice';
import {
  getFriendNearUser,
  getLastLocation,
  updateFriendInfo,
  updateFriendsNearUser,
} from '@/redux/slice/mapLocationSlice';
import {
  createUserLikeStack,
  deleteUserLikeStacks,
  getMatchingFriends,
} from '@/redux/slice/userLikeStackSlice';

import { Badge, message } from 'antd';
import Spinning from '@/components/Spinning/Spinning';
import { useRouter } from 'next/router';
import { map } from 'leaflet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FindingPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
  const notifications = useAppSelector(
    (state: RootState) => state.notificationSlice,
  );
  const { userPosition } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );

  const [nearbyUsers, setNearbyUsers] = useState<IGetFriendNearUser[] | null>(
    null,
  );
  const [idSelected, setIdSelected] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [friendId, setFriendId] = useState('');

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
    // dispatch(getMatchingFriends());
    // console.log(matching);
    // localStorage.setItem('friendId' ,id)
    // setFriendId(id)
    // if (matching?.length > 0) {
    if (matchingRef.current) {
      const matchingEl = matchingRef.current;

      matchingEl.hidden = false;

      setTimeout(() => {
        matchingEl.classList.add('show');
      }, 10);
    }
    // } else {
    //   message.info('B???n ???? xem h???t ng?????i d??ng ???? k???t ????i', 2);
    // }
  }, [matching]);

  const closeMatchPagePopUp = useCallback(() => {
    if (matchingRef.current) {
      const match = matchingRef.current;
      const ids = matching.map((el) => el.id);
      ids.length && dispatch(deleteUserLikeStacks({ ids: ids }));
      match.classList.remove('show');
      localStorage.removeItem('friendId');
      setFriendId('');
      return;
    }
  }, []);

  const onLike = (id: string) => {
    const arr = nearbyUsers?.filter((user) => {
      return user.id !== id;
    });
    if (arr?.length === 0) {
      dispatch(updateFriendInfo(null));
    } else {
      dispatch(updateFriendInfo(arr[0]));
    }
    // dispatch(createUserLikeStack({ toUserId: id }));
    // toast.success("Th??ch th??nh c??ng",{
    //   autoClose: 1000,
    //   position: "top-center",
    //   hideProgressBar: true
    // })
    message.success('Th??ch th??nh c??ng');

    setFriendId(id);
    openMatchPagePopUp();
    setNearbyUsers(arr);
    dispatch(updateFriendsNearUser(arr));
  };

  const onDislike = (id: string) => {
    const arr = nearbyUsers?.filter((user) => {
      return user.id !== id;
    });
    dispatch(updateFriendsNearUser(arr));
    if (arr?.length === 0) {
      dispatch(updateFriendInfo(null));
    } else {
      dispatch(updateFriendsNearUser(arr));
    }
    // dispatch(createUserBlock({ blockedUserId: id }));
    // toast.success("Ch???n th??nh c??ng",{
    //   autoClose: 1000,
    //   position: "top-center",
    //   hideProgressBar: true
    // })
    message.success('Ch???n th??nh c??ng');
    setNearbyUsers(arr);
  };

  const onCheckInfo = (user: IGetFriendNearUser) => {
    dispatch(updateFriendInfo(user));
    setIdSelected(user.id);
  };

  const getUsers = async () => {
    // const isGetFriendNearUser = await dispatch(getFriendNearUser());

    // if (isGetFriendNearUser.payload) {
    setIsLoading(false);
    // }
  };

  useEffect(() => {
    if (!userPosition || userPosition.lat === 0 || userPosition.long === 0)
      router.push('/map');
    getUsers();
    // dispatch(getLastLocation());
    // dispatch(getMatchingFriends());
    // matching?.length && openMatchPagePopUp();
  }, []);

  useEffect(() => {
    setNearbyUsers(friendsNearUser);
  }, [friendsNearUser]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('notification-received', (data: IItemNotify) => {
  //       setNotifications([...notifications, data]);
  //     });

  //     return () => {
  //       socket.off('notification-received');
  //     };
  //   }
  // }, [notifications]);

  return (
    <Layout
      isLogo={false}
      title="Find stranger"
      isHeader={false}
      isFooter={true}
    >
      <div className="findingPage">
        <div className="findingPage-header">
          <h2 className="findingPage-header-brandName">Tinai</h2>

          <Badge
            count={notifications.unreadNotice}
            overflowCount={10}
            color="purple"
            style={{ lineHeight: 'auto' }}
          >
            <Image
              onClick={openNotify}
              src="/assets/images/notification-bell.svg"
              alt="bell"
              width={'20px'}
              height={'20px'}
            />
          </Badge>
        </div>
        {!isLoading ? (
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
                <SwiperSlide
                  key={index}
                  className="findingPage-container-swiper"
                >
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
        ) : (
          <div
            className="spinning-container"
            style={{
              height: '76%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinning />
          </div>
        )}

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
          notifications={notifications.data}
          openMatchPage={openMatchPagePopUp}
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
          friendId={friendId}
        />
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default FindingPage;
