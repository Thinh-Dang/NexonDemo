import { FC } from 'react';
import Image from 'next/image';
import styleScss from './Button.module.scss';
import { IButton } from '@/@type/components';
import inconArrowRight from '../../../../public/assets/Arrow-Right-Circle.svg';

export const Button: FC<IButton> = ({
  type,
  id,
  name,
  style,
  disabled = false,
  content,
  btnClass,
  onClick,
  isHaveIcon,
}) => {
  if (isHaveIcon) {
    return (
      <button
        type={type}
        id={id}
        name={name}
        style={style}
        disabled={disabled}
        onClick={onClick}
        className={styleScss.btnGroup}
      >
        <p>{content}</p>
        <Image src={inconArrowRight} alt="Zodinet" />
      </button>
    );
  }

  return (
    <button
      type={type}
      id={id}
      name={name}
      style={style}
      disabled={disabled}
      className={btnClass}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
