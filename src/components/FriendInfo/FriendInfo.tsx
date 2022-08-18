import Image from 'next/image';
import { FC } from 'react';
import Tags from '../common/Tags/Tags';
import styles from './FriendInfo.module.scss';

const FriendInfoComponent: FC<IFriend> = ({ friendInfo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.friend_info}>
        <div className={styles.friend_info__div_image}>
          <Image
            // src="/assets/images/linda-avatar.svg"
            src={friendInfo.friendAvatar}
            alt={friendInfo.friendName}
            width={'84px'}
            height={'84px'}
            className={styles.friend_info__div_image__image}
          />
        </div>
        <div className={styles.friend_info__info}>
          <h3>{friendInfo.friendName}</h3>
          <Tags
            color="default"
            title={`Cách ${friendInfo.distance}m`}
            icon="/assets/images/location-icon.svg"
            name="Location icon"
            width="12px"
            height="12px"
          />
        </div>
      </div>
      <div className={styles.container__icon_info}>
        <Image
          src="/assets/images/information-icon.svg"
          alt="Information Icon"
          width={'24px'}
          height={'24px'}
        />
      </div>
    </div>
  );
};

export default FriendInfoComponent;
