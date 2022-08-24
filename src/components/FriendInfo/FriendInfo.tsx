import { IFriend } from '@/@type/components';
import Image from 'next/image';
import { FC } from 'react';
import Tags from '../common/Tags/Tags';
import styles from './FriendInfo.module.scss';

const FriendInfoComponent: FC<IFriend> = ({ friendInfo, handleInfoClick }) => {
  return friendInfo ? (
    <div className={styles.container}>
      <div className={styles.friend_info}>
        <div className={styles.friend_info__div_image}>
          <Image
            src={friendInfo?.avatar || '/assets/images/default.jpg'}
            alt={friendInfo?.name || ''}
            width={'84px'}
            height={'84px'}
            className={styles.friend_info__div_image__image}
          />
        </div>
        <div className={styles.friend_info__info}>
          <h3>{friendInfo?.name || ''}</h3>
          <Tags
            color="default"
            title={`Cách ${friendInfo?.distance} ${friendInfo?.unit}`}
            icon="/assets/images/location-with-shadow-icon.svg"
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
          width={'16px'}
          height={'16px'}
          onClick={() => handleInfoClick(friendInfo?.id)}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default FriendInfoComponent;
