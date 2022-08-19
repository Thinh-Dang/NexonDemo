import { FC } from 'react';
import styleCss from './MyButton.module.scss';

import { IMyButton } from '@/@type/components';

export const MyButton: FC<IMyButton> = ({ title, type }) => {
  if (type == 'submit')
    return (
      <button className={styleCss.myButton} type={'submit'}>
        {title}
      </button>
    );

  if (type == 'reset')
    return (
      <button className={styleCss.myButton} type={'reset'}>
        {title}
      </button>
    );

  return (
    <button className={styleCss.myButton} type={'button'}>
      {title}
    </button>
  );
};
