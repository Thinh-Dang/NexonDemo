import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { callAPISendOTP } from '@/redux/slice/userSlice';
import React, { useEffect, useState } from 'react';

type Props = {
  stylebtn: string;
};

const Timer = ({ stylebtn }: Props) => {
  const myState = useAppSelector((state: RootState) => state.userSlice);
  const requestAgain = {
    phone: myState.phone,
  };
  const dispatch = useAppDispatch();
  const sendAgainOpt = () => {
    dispatch(callAPISendOTP(requestAgain));
  };
  const [timerSeconds, setTimerSeconds] = useState<string>();
  const [timerMinutes, setTimerMinus] = useState<string>();

  const startTimer = () => {
    const countDownExp = myState.isValidOtpWhenEmailVerify
      ? new Date(Date.now() + 5 * 60 * 1000).getTime()
      : new Date(Date.now() + 10 * 60 * 1000).getTime();
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
  if (myState.isValidOtp) {
    return (
      <>
        <button
          style={{ opacity: '0.5' }}
          disabled
          onClick={sendAgainOpt}
          type="button"
          className={stylebtn}
        >
          Gửi Lại OTP
        </button>
      </>
    );
  }
  return (
    <>
      {timerMinutes === '00' && timerSeconds === '00' ? (
        <button onClick={sendAgainOpt} type="button" className={stylebtn}>
          Gửi Lại OTP
        </button>
      ) : (
        <p>
          {timerMinutes} : {timerSeconds}
        </p>
      )}
    </>
  );
};

export default Timer;
