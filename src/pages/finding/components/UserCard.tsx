import React, { FC } from 'react';
import Image from 'next/image';
import { IGetFriendNearUser } from '@/@type/redux';
interface IProps {
  user: IGetFriendNearUser;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onCheckInfo: (user: IGetFriendNearUser) => void;
  onInfoClick: () => void;
}

const UserCard: FC<IProps> = ({
  user,
  onLike,
  onDislike,
  onCheckInfo,
  onInfoClick,
}) => {
  const age = (birthday: Date): number => {
    return new Date().getFullYear() - new Date(birthday).getFullYear();
  };
  const handleInfoClick = () => {
    onCheckInfo(user);
    onInfoClick();
  };
  return (
    <div
      className="findingPage-card"
      style={{
        backgroundImage: user.avatar
          ? `url('${user.avatar}')`
          : `url('https://cpad.ask.fm/868/263/174/-79996965-206ftsc-cbcii2enl13de50/large/image.jpg')`,
      }}
    >
      <div className="findingPage-card-content">
        <p className="findingPage-card-content-info">
          {user.name}, {user.birthday ? age(user.birthday) : 0}t
        </p>
        <span className="findingPage-card-content-location">
          <Image
            src="/assets/images/Location.svg"
            alt="location"
            width={'16px'}
            height={'16px'}
          />

          <span className="findingPage-card-content-location-distance">
            Cách {user.distance} {user.unit}
          </span>
        </span>
        <div className="findingPage-card-content-btnGroup">
          <div
            className="findingPage-card-content-btnGroup-btn"
            onClick={() => onDislike(user.id)}
          >
            <Image
              src="/assets/images/Close.svg"
              alt="close"
              width={'23px'}
              height={'23px'}
              onClick={() => onDislike(user.id)}
            />
          </div>
          <div
            className="findingPage-card-content-btnGroup-btn"
            onClick={() => onLike(user.id)}
          >
            <Image
              src="/assets/images/Union.svg"
              alt="heart"
              width={'23px'}
              height={'23px'}
              onClick={() => onLike(user.id)}
            />
          </div>
        </div>
        <div className="findingPage-card-content-infoBtn">
          <Image
            src="/assets/images/information-icon.svg"
            alt="information icon"
            width={'16px'}
            height={'16px'}
            onClick={handleInfoClick}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
