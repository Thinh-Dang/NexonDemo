import { FC } from 'react';
import styleScss from './ItemNotify.module.scss';
import moment from 'moment';
import Image from 'next/image';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
timeago.register('vi', vi);
import { IItemNotify } from '../../@type/components';
import { NotificationTypeEmnum } from '@/common/enums/enum';
import { useRouter } from 'next/router';

export const ItemNotify: FC<IItemNotify> = ({
  notification,
  openMatchPage,
}) => {
  const router = useRouter();
  const translateNotifyMessage = (type: string) => {
    switch (type) {
      case NotificationTypeEmnum.LIKE:
        return 'Ai đó đã thích bạn';

      case NotificationTypeEmnum.MATCH:
        return 'Bạn đã sánh đôi với ai đó';
      default:
        break;
    }
  };
  return (
    <div className={styleScss.itemNotify} key={notification.id}>
      <Image
        width={40}
        height={40}
        alt="icon"
        src={'/assets/images/Union.svg'}
      />
      <div className={styleScss.itemNotify__content}>
        {notification.type === NotificationTypeEmnum.LIKE && (
          <p>{translateNotifyMessage(notification.type)}</p>
        )}
        {notification.type === NotificationTypeEmnum.MATCH && (
          <p onClick={openMatchPage}>
            {translateNotifyMessage(notification.type)}
          </p>
        )}
        {/* <p>{moment(notification.createdAt).fromNow()}</p> */}
        <TimeAgo datetime={new Date(notification.createdAt)} locale="vi" />
      </div>
    </div>
  );
};
