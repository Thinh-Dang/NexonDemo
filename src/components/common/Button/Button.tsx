import { FC } from 'react';
import styleScss from './Button.module.scss';

export const Button: FC<IButton> = ({
  type,
  id,
  name,
  style,
  disabled = false,
  content,
  onClick,
}) => (
  <button
    type={type}
    id={id}
    name={name}
    style={style}
    disabled={disabled}
    className={`btn ${styleScss.button}`}
    onClick={onClick}
  >
    {content}
  </button>
);
