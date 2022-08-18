import { IInputContainer } from '@/@type/components';
import { FC } from 'react';
import styleCss from './InputContainer.module.scss';

export const InputContainer: FC<IInputContainer> = ({
  label,
  children,
  ...resProps
}) => {
  return (
    <div className={styleCss.inputContainer}>
      <label className={styleCss['inputContainer-label']}>{label}</label>
      <div {...resProps}>{children}</div>
    </div>
  );
};
