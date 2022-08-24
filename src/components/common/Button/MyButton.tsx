import { FC } from 'react';
import styleCss from './MyButton.module.scss';

export const MyButton: FC<IMyButton> = ({ title, type = 'button' }) => {
  return (
    <button className={styleCss.myButton} type={type}>
      {title}
    </button>
  );
};
