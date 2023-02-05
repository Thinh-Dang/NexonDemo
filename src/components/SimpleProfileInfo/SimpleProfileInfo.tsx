import { ISimpleProfileInfo } from '@/@type/components';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import { calculateAge } from '@/utils';
import styleScss from './SimpleProfileInfo.module.scss';
import { useRouter } from 'next/router';

export const SimpleProfileInfo: FC<ISimpleProfileInfo> = ({
  name,
  avatar,
  birthday,
  purposeTite,
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/change-simple-info');
  }, []);

  return (
    <div className={styleScss.simpleInfo} onClick={handleClick}>
      <Image
        className={styleScss.simpleInfo__image}
        alt="avatar"
        // src={avatar || '/assets/images/default.jpg'}
        src={
          avatar ||
          'https://i.pinimg.com/236x/20/5a/c8/205ac833d83d23c76ccb74f591cb6000.jpg'
        }
        objectFit={'cover'}
        width={40}
        height={40}
      />
      <div>
        <h3 className={styleScss.simpleInfo__nameAndAge}>
          {name}, {calculateAge(birthday)}t
        </h3>
        <p className={styleScss.simpleInfo__reasonHere}>
          {purposeTite ? purposeTite : 'Không có'}
        </p>
      </div>
    </div>
  );
};
