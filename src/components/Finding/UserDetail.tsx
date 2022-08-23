import { user } from 'firebase-functions/v1/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface IProps {
  user: IGetFriendNearUser;
  onLike: (id: string) => (e: { preventDefault: () => void }) => void;
  onDislike: (id: string) => (e: { preventDefault: () => void }) => void;
}
const UserDetail = (props: IProps) => {
  const { user, onLike, onDislike } = props;
  const hobbyColors = [
    '#FFF0F0',
    '#EDF7FF',
    '#FFF5ED',
    '#E9FBF1',
    '#F3D6D6',
    '#F9EDFF',
    '#FFEDF6',
    '#EDDEFF',
    '#E4DAE4',
    '#FFDEFC',
  ];
  const hobbies = [
    'mua sắm',
    'du lịch',
    'cafe',
    'đọc sách',
    'đi chơi',
    'games',
    'gigachad',
    'simp',
    'fan MU',
    'wibu',
    'DIY',
    'IT',
  ];
  const age = (birthday: Date): number => {
    const today = new Date();
    const birthdate = new Date(birthday);
    return today.getFullYear() - birthdate.getFullYear();
  };

  const iconList = {
    children: '/assets/images/icons8-child.svg',
    alcohol: '/assets/images/icons8-white-wine.svg',
    gender: '/assets/images/icons8-gender.svg',
    religion: '/assets/images/icons8-applause.svg',
    education: '/assets/images/icons8-graduation-cap.svg',
    height: '/assets/images/icons8-length.svg',
    marital_status: '/assets/images/icons8-ring.svg',
  };

  return (
    <div className="user-detail">
      <img className="user-detail-avatar" src={user?.avatar} alt="avatar" />
      <div className="user-detail-infoContainer">
        <p className="user-detail-infoContainer-name">
          {user?.name}, {user?.birthday && age(user?.birthday) + 't'}
        </p>
        <span className="user-detail-infoContainer-location">
          <Image
            src="/assets/images/Location.svg"
            alt="location"
            width={'16px'}
            height={'16px'}
          />
          <span className="user-detail-infoContainer-location-distance">
            Cách {user?.distance} {user?.unit}
          </span>
        </span>
        <span className="user-detail-infoContainer-quote">
          <span className="user-detail-infoContainer-quote-openQuote">“</span>
          Hôm nay em đi học, bị điểm kém môn Anh. Cô giáo dạy “Yêu” là “love”,
          mà em cứ viết tên anh.
        </span>
        <section className="user-detail-infoContainer-detail">
          <p className="user-detail-infoContainer-detail-title">
            Thông tin của {user.name}
          </p>
          <div className="user-detail-infoContainer-detail-list">
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.alcohol}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                Không bao giờ
              </span>
            </span>
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.children}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                Không bao giờ
              </span>
            </span>
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.education}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                Bằng cấp 2
              </span>
            </span>
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.gender}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                Nữ thẳng
              </span>
            </span>
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.height}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                175 cm
              </span>
            </span>
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.marital_status}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                Không bao giờ
              </span>
            </span>
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.religion}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                Phật giáo
              </span>
            </span>
          </div>
        </section>
        <section className="user-detail-infoContainer-hobby">
          <p className="user-detail-infoContainer-hobby-title">Tôi thích...</p>
          <div className="user-detail-infoContainer-hobby-list">
            {hobbies.map((hobby, index) => {
              return (
                <span
                  key={`hobby ${index}`}
                  style={{
                    backgroundColor: `${
                      index < hobbyColors.length
                        ? hobbyColors[index]
                        : hobbyColors[index - hobbyColors.length]
                    }`,
                  }}
                  className="user-detail-infoContainer-hobby-list-item"
                >
                  #{hobby}
                </span>
              );
            })}
          </div>
        </section>
      </div>
      <div className="user-detail-gallery">
        <img
          src="./assets/images/avatar/avatar1.jpg"
          alt="avatar"
          className="user-detail-gallery-item"
        />
        <img
          src="./assets/images/avatar/avatar2.jpg"
          alt="avatar"
          className="user-detail-gallery-item"
        />
        <img
          src="./assets/images/avatar/avatar3.jpg"
          alt="avatar"
          className="user-detail-gallery-item"
        />
      </div>
    </div>
  );
};

export default UserDetail;
