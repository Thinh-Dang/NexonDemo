import { IMySelect } from '@/@type/components';
import { Select } from 'antd';
import { FC } from 'react';
import styleCss from '../../../components/MyInput/MyInput.module.scss';
import Image from 'next/image';

const { Option } = Select;

export const MySelect: FC<IMySelect> = ({
  source,
  defaultValue,
  title,
  onChange,
}) => {
  return (
    <div className={styleCss.groupInput}>
      <p className={styleCss.groupInput__label}>{title}</p>
      <div>
        <Select
          className={styleCss.mySelectionInput}
          bordered={false}
          defaultValue={defaultValue}
          onChange={onChange}
          suffixIcon={
            <Image
              src={'/assets/arrow-down.svg'}
              width={10}
              height={10}
              alt="zodinet"
            />
          }
        >
          {source.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
