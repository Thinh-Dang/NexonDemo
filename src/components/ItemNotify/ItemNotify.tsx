import { FC } from 'react';
import styleScss from './ItemNotify.module.scss';

import moment from 'moment';
import Image from 'next/image';
import { IItemNotify } from '../../@type/components';

export const ItemNotify: FC<IItemNotify> = ({ notification }) => {
  return (
    <div className={styleScss.itemNotify} key={notification.id}>
      <Image
        width={40}
        height={40}
        alt="icon"
        src={'/assets/images/Union.svg'}
      />
      <div className={styleScss.itemNotify__content}>
        <p>{notification.message}</p>
        <p>{moment(notification.createAt).startOf('hour').fromNow()}</p>
      </div>
    </div>
  );
};
