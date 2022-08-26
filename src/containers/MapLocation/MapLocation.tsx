import { Card, Layout } from '@/components';
import FriendInfoComponent from '@/components/FriendInfo/FriendInfo';
import MapLocationHead from '@/components/MapLoaction/MapLocationHead';
import { RootState, useAppSelector } from '@/redux';
import dynamic from 'next/dynamic';
import { ComponentType, FC, useCallback, useRef, useState } from 'react';
import styles from './MapLocation.module.scss';
import { createUserBlock } from '@/redux/slice/userBlockSlice';
import { createUserLikeStack } from '@/redux/slice/userLikeStackSlice';
import { useAppDispatch } from '@/redux';
import UserDetail from '@/components/Finding/UserDetail';
import { updateFriendsNearUser } from '@/redux/slice/mapLocationSlice';

const MapWithNoSSR: ComponentType = dynamic(
  () => import('@/components/MapLoaction/Map'),
  {
    ssr: false,
  },
);
const MapLocationContainer: FC = () => {
  const { friendsNearUser, friendInfo } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const [selectedId, setSelectedId] = useState<string | null>('');
  const dispatch = useAppDispatch();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
  const handleInfoClick = (id: string) => {
    openPopUp();
    setSelectedId(id);
  };
  const onOverlayClick = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.classList.remove('popup');
      overlay.classList.remove('overlay-show');

      // card.hidden = true;
      // overlay.hidden = true;
      // setTimeout(() => {
      // }, 1000);
    }
    setSelectedId(null);
  }, []);
  const onLike = (id: string) => {
    const newList = friendsNearUser.filter((el) => el.id !== id);
    dispatch(createUserLikeStack({ toUserId: id }));
    dispatch(updateFriendsNearUser(newList));
  };

  const onDislike = (id: string) => {
    dispatch(createUserBlock({ blockedUserId: id }));
  };
  return (
    <Layout title="Map location" isHeader={false} isFooter={true}>
      <div className={styles.map_location}>
        <MapLocationHead title="Home" description="" url="" ogImage="" />
        <MapWithNoSSR />
        <FriendInfoComponent
          friendInfo={friendInfo}
          handleInfoClick={handleInfoClick}
        />
        <Card
          hasCloseBtn={true}
          onCloseCard={onOverlayClick}
          height={'90vh'}
          ref={cardRef}
        >
          {selectedId && (
            <UserDetail
              id={selectedId}
              onLike={onLike}
              onDislike={onDislike}
              onCloseModal={onOverlayClick}
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

export default MapLocationContainer;
