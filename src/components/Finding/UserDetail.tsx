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
    // 'gigachad',
    // 'simp',
    // 'fan MU',
    // 'wibu',
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
          {friendInfo?.description || 'No quote is the best quote'}
        </span>
        <section className="user-detail-infoContainer-detail">
          <p className="user-detail-infoContainer-detail-title">
            Thông tin của {friendInfo?.name}
          </p>
          <div className="user-detail-infoContainer-detail-list">
            {/* ALCOHOL */}
            {friendInfo?.alcohol && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.alcohol}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertAlcoholEnum(friendInfo?.alcohol)}
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
                {friendInfo?.children != 0 && friendInfo?.children
                  ? `${friendInfo?.children} con`
                  : 'Chưa có con'}
              </span>
            </span>
            {/* EDUCATION */}
            {friendInfo?.education && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.education}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertEducationEnum(friendInfo?.education)}
                </span>
              </span>
            )}
            {/* GENDER */}
            {friendInfo?.gender && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.gender}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertGenderEnum(friendInfo?.gender) || 'Không tiết lộ'}
                </span>
              </span>
            )}
            {friendInfo?.height && friendInfo.height > 0 && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.height}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {friendInfo?.height}cm
                </span>
              </span>
            )}
            {/* MARITAL STATUS */}
            {friendInfo?.maritalStatus && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.marital_status}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertMaritalStatusEnum(friendInfo?.maritalStatus)}
                </span>
              </span>
            )}
            {/* RELIGION */}
            {friendInfo?.religion && (
              <span className="user-detail-infoContainer-detail-list-item">
                <Image
                  src={iconList.religion}
                  alt="icon"
                  width={'24px'}
                  height={'24px'}
                />
                <span className="user-detail-infoContainer-detail-list-item-content">
                  {ConvertReligionEnum(friendInfo?.religion)}
                </span>
              </span>
            )}
          </div>
        </section>
        <section className="user-detail-infoContainer-hobby">
          <p className="user-detail-infoContainer-hobby-title">Tôi thích...</p>
          <div className="user-detail-infoContainer-hobby-list">
            {hobbies.length ? (
              hobbies.map((hobby, index) => {
                return (
                  <span
                    key={index}
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
        {friendInfo?.album.length ? (
          friendInfo.album.map((image) => {
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
