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
      <div className={styleScss.closeBtn}>
        <Image
          src="/assets/images/Close.svg"
          width={23}
          height={23}
          alt="close"
          onClick={props.onCloseCard}
        />
      </div>

      {sortedArr.length !== 0 ? (
        <div className={styleScss.notifyList}>
          {sortedArr?.map((notify) => {
            return (
              <ItemNotify
                key={notify.id}
                notification={notify}
                openMatchPage={props.openMatchPage}
              />
            );
          })}
        </div>
      ) : (
        // (<p style={{fontSize: '1.2rem'}}>Chưa có thông báo nào</p>)
        <div
          className="EmptyNotification"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '10rem',
          }}
        >
          <Image
            src={
              'https://i.pinimg.com/564x/06/67/dd/0667dddfbbc198264201d8cd2d318eb4.jpg'
            }
            objectFit={'cover'}
            width={100}
            height={100}
          />
          <p style={{ fontSize: '1.2rem' }}>Chưa có thông báo nào</p>
        </div>
      )}
    </div>
  );
});

NotifyContainer.displayName = 'NotifyContainer';
