import Image from 'next/image';
import Tags from '../common/Tags/Tags';
import styles from './FriendInfo.module.scss';

const FriendInfoComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.friend_info}>
        <div className={styles.friend_info__div_image}>
          <Image
            src="/assets/images/linda-avatar.svg"
            alt="Linda avatar"
            width={'84px'}
            height={'84px'}
            className={styles.friend_info__div_image__image}
          />
        </div>
        <div className={styles.friend_info__info}>
          <h3>Linda, 22t</h3>
          <Tags
            color="default"
            title="Cách 200m"
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
