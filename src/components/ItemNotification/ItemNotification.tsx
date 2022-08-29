import { FC } from 'react';

import { message } from 'antd';
import { IItemNotification } from '@/@type/components';

export const ItemNotification: FC<IItemNotification> = ({
  content,
  time = 5,
}) => {
  return <>{message.success(content, time)}</>;
};
