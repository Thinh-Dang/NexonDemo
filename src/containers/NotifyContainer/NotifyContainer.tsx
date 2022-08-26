import React from 'react';
import styleScss from './NotifyContainer.module.scss';

import Image from 'next/image';
import { ItemNotify } from '@/components';

export const NotifyContainer = React.forwardRef<
  HTMLDivElement,
  INotifyContainer
>((props, ref) => {
  return (
    <div className={styleScss.notifyContainer} ref={ref}>
      <h4 className={styleScss.notifyContainerTitle}>Thông báo của bạn: </h4>
      <div className={styleScss.notifyList}>
        {props.notifications.length !== 0 &&
          props.notifications?.map((notify) => {
            return <ItemNotify key={notify.id} notification={notify} />;
          })}

        <div className={styleScss.closeBtn}>
          <Image
            src="/assets/images/Close.svg"
            width={23}
            height={23}
            alt="close"
            onClick={props.onCloseCard}
          />
        </div>
      </div>
    </div>
  );
});

NotifyContainer.displayName = 'NotifyContainer';
