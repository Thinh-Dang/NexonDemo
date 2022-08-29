import React from 'react';
import styleScss from './NotifyContainer.module.scss';

import Image from 'next/image';
import { ItemNotify } from '@/components';

export const NotifyContainer = React.forwardRef<
  HTMLDivElement,
  INotifyContainer
>((props, ref) => {
  function dateComparison(a: any, b: any) {
    const date1: any = new Date(a.createdAt);
    const date2: any = new Date(b.createdAt);

    return date2 - date1;
  }
  const sortedArr = [...props.notifications];
  sortedArr.sort(dateComparison);

  return (
    <div className={styleScss.notifyContainer} ref={ref}>
      <h4 className={styleScss.notifyContainerTitle}>Thông báo của bạn: </h4>
      <div className={styleScss.notifyList}>
        {sortedArr.length !== 0 &&
          sortedArr?.map((notify) => {
            return (
              <ItemNotify
                key={notify.id}
                notification={notify}
                openMatchPage={props.openMatchPage}
              />
            );
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
