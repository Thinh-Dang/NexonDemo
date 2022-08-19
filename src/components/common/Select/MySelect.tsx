import { IMySelect } from '@/@type/components';
import { FC } from 'react';
import styleCss from './MySelect.module.scss';

export const MySelect: FC<IMySelect> = ({
  source,
  defaultValue,
  ...resProps
}) => {
  return (
    <select
      className={styleCss.mySelect}
      defaultValue={defaultValue}
      {...resProps}
    >
      {source.map((item) => (
        <option
          key={item.value}
          value={item.value}
          className={styleCss['mySelect-option']}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};
