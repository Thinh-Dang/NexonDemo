import { DatePicker, Input, Select, Tag } from 'antd';
import Image from 'next/image';
import { FC, useEffect, useRef } from 'react';
import iconArrowDown from '../../../public/assets/arrow-down.svg';
import iconDate from '../../../public/assets/Calendar.svg';
import styleScss from './MyInput.module.scss';

import { IMyInput } from '@/@type/components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import moment from 'moment';
import Timer from '../Timer/Timer';
const { TextArea } = Input;
const MyInput: FC<IMyInput> = ({
  isInput,
  txtLabel,
  txtPlaceholder,
  isDatePicker,
  isSelection,
  isTextArea,
  type,
  defaultValue,
  name,
  handleChange,
  handleBlur,
  handleChangeDatePicker,
  value,
  onSubmitOtp,
  disabled,
  errorOTP,
}) => {
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  const fourthRef = useRef<HTMLInputElement>(null);
  const fifthRef = useRef<HTMLInputElement>(null);
  const sixthRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      firstRef.current &&
      secondRef.current &&
      thirdRef.current &&
      fourthRef.current &&
      fifthRef.current &&
      sixthRef.current
    ) {
      const refs = [
        firstRef.current,
        secondRef.current,
        thirdRef.current,
        fourthRef.current,
        fifthRef.current,
        sixthRef.current,
      ];
      for (let i = 0; i < refs.length; i++) {
        refs[i].addEventListener('mouseenter', function (event) {
          if (refs[0].value === '') {
            refs[0].focus();
          } else if (refs[1].value === '') {
            refs[1].focus();
          } else if (refs[2].value === '') {
            refs[2].focus();
          } else if (refs[3].value === '') {
            refs[3].focus();
          } else if (refs[4].value === '') {
            refs[4].focus();
          } else if (refs[5].value === '') {
            refs[5].focus();
          }
        });

        refs[i].addEventListener('keydown', function (event) {
          if (event.key === 'Backspace') {
            refs[i].value = '';
            onSubmitOtp(refs);
            if (i !== 0) refs[i - 1].focus();
          } else {
            if (i === refs.length - 1 && refs[i].value !== '') {
              onSubmitOtp(refs);
              return true;
            } else if (/^[0-9]*$/.test(event.key)) {
              refs[i].value = event.key;
              onSubmitOtp(refs);
              if (i !== refs.length - 1) refs[i + 1].focus();
            }
            event.preventDefault();
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstRef, secondRef, thirdRef, fourthRef, fifthRef, sixthRef]);

  if (isTextArea) {
    return (
      <div className={styleScss.groupInput}>
        <label className={styleScss.groupInput__label}>
          {txtLabel}
          <span style={{ color: '#FE5D5D' }}>*</span>
        </label>
        <TextArea
          onChange={handleChange}
          onBlur={handleBlur}
          name={name}
          rows={6}
          maxLength={200}
          defaultValue={defaultValue}
          placeholder={txtPlaceholder}
          className={styleScss.groupInput__textArea}
        />
      </div>
    );
  }

  // Input normal
  if (isInput) {
    return (
      <div className={styleScss.groupInput}>
        <label className={styleScss.groupInput__label}>
          {txtLabel}
          <span style={{ color: '#FE5D5D' }}>*</span>
        </label>
        {defaultValue !== undefined ? (
          <Input
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
            name={name}
            type={type}
            defaultValue={defaultValue}
            placeholder={txtPlaceholder}
            className={styleScss.groupInput__input}
          />
        ) : (
          <Input
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
            name={name}
            type={type}
            placeholder={txtPlaceholder}
            className={styleScss.groupInput__input}
            value={value ? value : '' ?? ''}
          />
        )}
      </div>
    );
  }

  if (isDatePicker) {
    return (
      <div className={styleScss.groupInput}>
        <p className={styleScss.groupInput__label}>Năm sinh</p>
        <DatePicker
          name={name}
          onChange={handleChangeDatePicker}
          clearIcon={false}
          format={'DD/MM/YYYY'}
          defaultValue={
            defaultValue
              ? moment(defaultValue.toLocaleDateString('vi-VN'), 'DD/MM/YYYY')
              : moment('18/12/1980', 'DD/MM/YYYY')
          }
          className={styleScss.groupInput__myDatePicker}
          suffixIcon={<Image src={iconDate} alt="Zodinet" />}
        />
      </div>
    );
  }

  if (isSelection) {
    return (
      <div className={styleScss.groupInput}>
        <p className={styleScss.groupInput__label}>Giới Tính</p>
        <div>
          <Select
            onChange={handleChange}
            bordered={false}
            defaultValue="Other"
            suffixIcon={<Image src={iconArrowDown} alt="zodinet" />}
            className={styleScss.mySelectionInput}
          >
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            <Option value="Other">Khác</Option>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styleScss.otpInput}>
        <div className={styleScss.otpInput__groupInput}>
          <input type="text" maxLength={1} ref={firstRef} />
          <span></span>
        </div>
        <div className={styleScss.otpInput__groupInput}>
          <input type="text" maxLength={1} ref={secondRef} />
          <span></span>
        </div>
        <div className={styleScss.otpInput__groupInput}>
          <input type="text" maxLength={1} ref={thirdRef} />
          <span></span>
        </div>
        <div className={styleScss.otpInput__groupInput}>
          <input type="text" maxLength={1} ref={fourthRef} />
          <span></span>
        </div>
        <div className={styleScss.otpInput__groupInput}>
          <input type="text" maxLength={1} ref={fifthRef} />
          <span></span>
        </div>
        <div className={styleScss.otpInput__groupInput}>
          <input type="text" maxLength={1} ref={sixthRef} />
          <span></span>
        </div>
      </div>
      {errorOTP ? (
        <div className={styleScss.errors__message}>
          <Tag
            style={{ width: '100%' }}
            icon={<CloseCircleOutlined />}
            color="error"
          >
            {errorOTP}
          </Tag>
        </div>
      ) : (
        ''
      )}
      <div
        style={{
          textAlign: 'right',
          marginBottom: '4.1rem',
          display: 'block',
          marginTop: '3.6rem',
        }}
      >
        <Timer stylebtn={styleScss.bntOutline} />
      </div>
    </>
  );
};
export default MyInput;
