import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { getFriendProfle } from '@/redux/slice/mapLocationSlice';
import {
  ConvertAlcoholEnum,
  ConvertEducationEnum,
  ConvertGenderEnum,
  ConvertMaritalStatusEnum,
  ConvertReligionEnum,
} from '@/utils';
import Image from 'next/image';
import { useEffect } from 'react';
import BtnGroup from './BtnGroup';
interface IProps {
  id: string;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onCloseModal: () => void;
}
const UserDetail = (props: IProps) => {
  const { id, onLike, onDislike, onCloseModal } = props;
  const { friendInfo, friendProfile } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFriendProfle(id));
  }, [id]);

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
    return new Date().getFullYear() - new Date(birthday).getFullYear();
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

  // const handleDislike = (id: string) => {
  //   onDislike(id);
  //   onCloseModal();
  // };
  return (
    <div className="user-detail">
      <img
        className="user-detail-avatar"
        src={friendInfo?.avatar}
        alt="avatar"
      />
      <div className="user-detail-infoContainer">
        <p className="user-detail-infoContainer-name">
          {friendInfo?.name},{' '}
          {friendInfo?.birthday && age(friendInfo?.birthday) + 't'}
        </p>
        <span className="user-detail-infoContainer-location">
          <Image
            src="/assets/images/Location.svg"
            alt="location"
            width={'16px'}
            height={'16px'}
          />
          <span className="user-detail-infoContainer-location-distance">
            Cách {friendInfo?.distance} {friendInfo?.unit}
          </span>
        </span>
        <span className="user-detail-infoContainer-quote">
          <span className="user-detail-infoContainer-quote-openQuote">“</span>
          {friendProfile?.description}
        </span>
        <section className="user-detail-infoContainer-detail">
          <p className="user-detail-infoContainer-detail-title">
            Thông tin của {friendInfo?.name}
          </p>
          <div className="user-detail-infoContainer-detail-list">
            {/* ALCOHOL */}
            {friendProfile?.alcohol && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.alcohol}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertAlcoholEnum(friendProfile?.alcohol)}
                </span>
              </span>
            )}
            {/* CHILDREN */}
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.children}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                {friendProfile?.children != 0
                  ? friendProfile?.children
                  : 'Chưa có'}
              </span>
            </span>
            {/* EDUCATION */}
            {friendProfile?.education && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.education}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertEducationEnum(friendProfile?.education)}
                </span>
              </span>
            )}
            {/* GENDER */}
            {friendProfile?.gender && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.gender}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertGenderEnum(friendProfile?.gender)}
                </span>
              </span>
            )}
            <span className="user-detail-infoContainer-detail-list-item">
              <Image
                src={iconList.height}
                alt="icon"
                width={'24px'}
                height={'24px'}
              />
              <span className="user-detail-infoContainer-detail-list-item-content">
                {friendProfile?.height}cm
              </span>
            </span>
            {/* MARITAL STATUS */}
            {friendProfile?.maritalStatus && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.marital_status}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertMaritalStatusEnum(friendProfile?.maritalStatus)}
                </span>
              </span>
            )}
            {/* RELIGION */}
            {friendProfile?.religion && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.religion}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertReligionEnum(friendProfile?.religion)}
                </span>
              </span>
            )}
          </div>
        </section>
        <section className="user-detail-infoContainer-hobby">
          <p className="user-detail-infoContainer-hobby-title">Tôi thích...</p>
          <div className="user-detail-infoContainer-hobby-list">
            {friendProfile?.hobbies.length ? (
              friendProfile?.hobbies.map((hobby, index) => {
                return (
                  <span
                    key={hobby.id}
                    style={{
                      backgroundColor: `${
                        index < hobbyColors.length
                          ? hobbyColors[index]
                          : hobbyColors[index - hobbyColors.length]
                      }`,
                    }}
                    className="user-detail-infoContainer-hobby-list-item"
                  >
                    #{hobby.name}
                  </span>
                );
              })
            ) : (
              <span
                style={{
                  backgroundColor: `${hobbyColors[5]}`,
                }}
                className="user-detail-infoContainer-hobby-list-item"
              >
                Chưa có sở thích
              </span>
            )}
          </div>
        </section>
      </div>
      <div className="user-detail-gallery">
        {friendProfile?.album.length ? (
          friendProfile.album.map((image) => {
            return (
              <img
                key={`img ${image.id}`}
                src={image.url}
                alt="avatar"
                className="user-detail-gallery-item"
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <BtnGroup
        userId={id}
        onLike={onLike}
        onDislike={onDislike}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

export default UserDetail;
