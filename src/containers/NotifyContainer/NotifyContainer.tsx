import { ICard } from '@/@type/components';
import { ItemNotify } from '@/components';
import React from 'react';
import styleScss from './NotifyContainer.module.scss';

export const NotifyContainer = React.forwardRef<HTMLDivElement, ICard>(
  (props, ref) => (
    <div className={styleScss.notifyContainer} ref={ref} hidden>
      <ItemNotify />
      <ItemNotify />
      <ItemNotify />
      <ItemNotify />
      <ItemNotify />
      <ItemNotify />
    </div>
  ),
);

NotifyContainer.displayName = 'NotifyContainer';
