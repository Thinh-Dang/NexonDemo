import { FC } from 'react';
import styleScss from './ItemNotify.module.scss';
import moment from 'moment';
import Image from 'next/image';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
timeago.register('vi', vi);
import { IItemNotify } from '../../@type/components';

export const ItemNotify: FC<IItemNotify> = ({ notification }) => {
  console.log(notification);

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
        {/* <p>{moment(notification.createdAt).fromNow()}</p> */}
        <TimeAgo datetime={new Date(notification.createdAt)} locale="vi" />
      </div>
    </div>
  );
};
