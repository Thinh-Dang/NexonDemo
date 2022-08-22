import { Layout } from '@/components';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper';
import UserCard from './components/UserCard';
import { IUserNearby } from '@/@type/redux';

const FindingPage = () => {
  const [nearbyUsers, setNearbyUsers] = useState<IUserNearby[]>([
    {
      id: '1',
      name: 'Linda',
      age: 18,
      distance: 200,
      imgUrl: './assets/images/avatar/avatar1.jpg',
    },
    {
      id: '2',
      name: 'Ladin',
      age: 16,
      distance: 300,
      imgUrl: './assets/images/avatar/avatar3.jpg',
    },
    {
      id: '3',
      name: 'Landi',
      age: 22,
      distance: 400,
      imgUrl: './assets/images/avatar/avatar5.jpg',
    },
    {
      id: '4',
      name: 'Lidan',
      age: 23,
      distance: 800,
      imgUrl: './assets/images/avatar/avatar7.jpg',
    },
    {
      id: '5',
      name: 'Dinla',
      age: 20,
      distance: 100,
      imgUrl: './assets/images/avatar/avatar9.jpg',
    },
  ]);
  const handleRemove = (id: string) => {
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        user.id !== id;
      }),
    );
  };
  const onLike = (id: string) => {};
  const onDislike = (id: string) => {};
  const onCheckInfo = (user: IUserNearby) => {};
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
          <img
            className="findingPage-header-notifications"
            src="./assets/images/notification-bell.svg"
            alt="bell"
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
