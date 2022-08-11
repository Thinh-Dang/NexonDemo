import { FC } from 'react';

export const Input: FC<IInput> = ({
  type,
  id,
  name,
  value,
  placeholder,
  style,
  required = false,
  disabled = false,
  onChange,
}) => {
  let className = 'form-control';

  if (type === 'radio' || type === 'checkbox') {
    className = 'form-check-input';
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      style={style}
      required={required}
      disabled={disabled}
      className={className}
      onChange={(e): void => onChange(e)}
    />
  );
};
