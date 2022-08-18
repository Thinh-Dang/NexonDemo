import { DatePicker, Select } from 'antd';
import Input from 'antd/lib/input/Input';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styleCss from './MyInput.module.scss';
import iconDate from '../../../public/assets/Calendar.svg';
import iconArrowDown from '../../../public/assets/arrow-down.svg';

import { Option } from 'antd/lib/mentions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  isInput?: boolean;
  txtLabel?: string;
  txtPlaceholder?: string;
  isDatePicker?: boolean;
  isSelection?: boolean;
  name?: string;
};
const MyInput = ({
  isInput,
  txtLabel,
  txtPlaceholder,
  isDatePicker,
  isSelection,
  name,
  handleChange,
  handleBlur,
}: Props) => {
  const [timerSeconds, setTimerSeconds] = useState<string>();
  const [timerMinutes, setTimerMinus] = useState<string>();

  const handleKeyPress = (e: any) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const startTimer = () => {
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
  };

  const padWithZeros = (number: number, minLenght: number) => {
    const numberString = number.toString();
    if (numberString.length >= minLenght) return numberString;
    return '0'.repeat(minLenght - numberString.length) + numberString;
  };

  useEffect(() => {
    startTimer();
  }, []);

  // Input normal

  if (isInput) {
    return (
      <div className={styleCss.groupInput}>
        <label className={styleCss.groupInput__label}>
          {txtLabel}
          <span style={{ color: '#FE5D5D' }}>*</span>
        </label>
        <Input
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
          clearIcon={false}
          format={'DD/MM/YYYY'}
          placeholder={'20/11/1980'}
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
