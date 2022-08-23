import Image from 'next/image';
import { FC } from 'react';
import styleScss from './ItemNotify.module.scss';

export const ItemNotify: FC = () => {
  return (
    <div className={styleScss.itemNotify}>
      <div>
        <Image
          width={40}
          height={40}
          alt="icon"
          src={'/assets/images/Union.svg'}
        />
      </div>
      <div className={styleScss.itemNotify__content}>
        <p>Có 1 ngươi vừa thích bạn</p>
        <p>1 giờ trước</p>
      </div>
    </div>
  );
};
