import { ICard } from '@/@type/components';
import { ItemNotify } from '@/components';
import React from 'react';
import styleScss from './NotifyContainer.module.scss';
import Image from 'next/image';

export const NotifyContainer = React.forwardRef<HTMLDivElement, ICard>(
  (props, ref) => (
    <div className={styleScss.notifyContainer} ref={ref}>
      <h4 className={styleScss.notifyContainerTitle}>Thông báo của bạn: </h4>
      <div className={styleScss.notifyList}>
        <ItemNotify />
        <ItemNotify />
        <ItemNotify />
        <ItemNotify />
        <ItemNotify />
        <ItemNotify />
        <img
          className={styleScss.closeBtn}
          src="/assets/images/Close.svg"
          alt="close"
          onClick={props.onCloseCard}
        />
      </div>
    </div>
  ),
);

NotifyContainer.displayName = 'NotifyContainer';
