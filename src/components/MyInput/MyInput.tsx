import { DatePicker, Select, Tag } from 'antd';
//import Input from 'antd/lib/input/Input';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import iconArrowDown from '../../../public/assets/arrow-down.svg';
import iconDate from '../../../public/assets/Calendar.svg';
import styleScss from './MyInput.module.scss';
import { Input } from 'antd';

import { Option } from 'antd/lib/mentions';
import moment from 'moment';
import { IMyInput } from '@/@type/components';
import { CloseCircleOutlined } from '@ant-design/icons';
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
  const [timerSeconds, setTimerSeconds] = useState<string>();
  const [timerMinutes, setTimerMinus] = useState<string>();
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  const fourthRef = useRef<HTMLInputElement>(null);
  const fifthRef = useRef<HTMLInputElement>(null);
  const sixthRef = useRef<HTMLInputElement>(null);

  const padWithZeros = (number: number, minLenght: number) => {
    const numberString = number.toString();
    if (numberString.length >= minLenght) return numberString;
    return '0'.repeat(minLenght - numberString.length) + numberString;
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

  const handleChangeOTP = (refs: any) => {
    const results = refs.reduce((acc: string, curr: any) => {
      return acc + curr.value;
    }, '');
    onSubmitOtp(results);
  };

  useEffect(() => {
    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

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
            handleChangeOTP(refs);
            if (i !== 0) refs[i - 1].focus();
          } else {
            if (i === refs.length - 1 && refs[i].value !== '') {
              handleChangeOTP(refs);
              return true;
            } else if (/^[0-9]*$/.test(event.key)) {
              refs[i].value = event.key;
              handleChangeOTP(refs);
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
            value={value ?? ''}
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
            <Option value="Other">Other</Option>
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
        style={{ textAlign: 'right', marginBottom: '4.1rem', display: 'block' }}
      >
        {timerMinutes === '00' && timerSeconds === '00' ? (
          <button type="button" className={styleScss.bntOutline}>
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
