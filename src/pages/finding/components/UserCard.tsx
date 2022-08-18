import React from 'react';

interface IProps {
  user: IUserNearby;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onCheckInfo: (user: IUserNearby) => void;
}

const UserCard = ({ user, onLike, onDislike, onCheckInfo }: IProps) => {
  return (
    <div
      className="findingPage-card"
      style={{ backgroundImage: `url('${user.imgUrl}')` }}
    >
      <div className="findingPage-card-content">
        <p className="findingPage-card-content-info">
          {user.name}, {user.age ? user.age : 0}t
        </p>
        <span className="findingPage-card-content-location">
          <img
            className="findingPage-card-content-location-icon"
            src="./assets/images/Location.svg"
            alt="location"
          />
          <span className="findingPage-card-content-location-distance">
            Cách {user.distance}m
          </span>
        </span>
        <div className="findingPage-card-content-btnGroup">
          <div className="findingPage-card-content-btnGroup-btn">
            <img src="./assets/images/Close.svg" alt="heart" />
          </div>
          <div className="findingPage-card-content-btnGroup-btn">
            <img src="./assets/images/Union.svg" alt="heart" />
          </div>
        </div>
        <div className="findingPage-card-content-infoBtn">
          <img src="./assets/images/information-icon.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
