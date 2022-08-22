import { DatePicker, Select } from 'antd';
//import Input from 'antd/lib/input/Input';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import iconArrowDown from '../../../public/assets/arrow-down.svg';
import iconDate from '../../../public/assets/Calendar.svg';
import styleCss from './MyInput.module.scss';
import { Input } from 'antd';

import { Option } from 'antd/lib/mentions';
import moment from 'moment';
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
}) => {
  const [timerSeconds, setTimerSeconds] = useState<string>();
  const [timerMinutes, setTimerMinus] = useState<string>();

  const handleKeyPress = (e: any) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const startTimer = (): NodeJS.Timer => {
    const countDownExp = new Date(Date.now() + 10 * 60 * 1000).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownExp - now;
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const newMinutes = padWithZeros(minutes, 2);
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      const newSeconds = padWithZeros(seconds, 2);
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimerMinus(newMinutes);
        setTimerSeconds(newSeconds);
      }
    });
    return interval;
  };

  const padWithZeros = (number: number, minLenght: number) => {
    const numberString = number.toString();
    if (numberString.length >= minLenght) return numberString;
    return '0'.repeat(minLenght - numberString.length) + numberString;
  };

  useEffect(() => {
    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (isTextArea) {
    return (
      <div className={styleCss.groupInput}>
        <label className={styleCss.groupInput__label}>
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
          className={styleCss.groupInput__textArea}
        />
      </div>
    );
  }

  // Input normal

  if (isInput) {
    return (
      <div className={styleCss.groupInput}>
        <label className={styleCss.groupInput__label}>
          {txtLabel}
          <span style={{ color: '#FE5D5D' }}>*</span>
        </label>
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={txtPlaceholder}
          className={styleCss.groupInput__input}
        />
      </div>
    );
  }

  if (isDatePicker) {
    return (
      <div className={styleCss.groupInput}>
        <p className={styleCss.groupInput__label}>Năm sinh</p>
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
          className={styleCss.groupInput__myDatePicker}
          suffixIcon={<Image src={iconDate} alt="Zodinet" />}
        />
      </div>
    );
  }

  if (isSelection) {
    return (
      <div className={styleCss.groupInput}>
        <p className={styleCss.groupInput__label}>Giới Tính</p>
        <div>
          <Select
            onChange={handleChange}
            bordered={false}
            defaultValue="Other"
            suffixIcon={<Image src={iconArrowDown} alt="zodinet" />}
            className={styleCss.mySelectionInput}
          >
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            <Option value="Other">Other</Option>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styleCss.otpInput}>
        <div>
          <input
            type="number"
            maxLength={6}
            onChange={handleChange}
            className={styleCss.myInput}
            onInput={(e) => handleKeyPress(e)}
            onBlur={handleBlur}
            name={name}
          />
          <div className={styleCss.groupDot}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right', marginBottom: '4.1rem' }}>
        {timerMinutes === '00' && timerSeconds === '00' ? (
          <button type="button" className={styleCss.bntOutline}>
            Gửi Lại OTP
          </button>
        ) : (
          <p>
            {timerMinutes}:{timerSeconds}
          </p>
        )}
      </div>
    </>
  );
};
export default MyInput;
