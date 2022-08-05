import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { googleProvider } from '@/config/providers';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '@/config/firebase-config';
import { useContext } from '@/context/UserContext';
import { Button } from 'antd';
import type { NextPage } from 'next';
import { loginOtp } from '@/services/login.api';

const Otp: NextPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState<string>(`2633378748`);
  const [code, setCode] = useState<string>(`777777`);
  const firebaseAuth = getAuth(firebaseApp);
  const { verifyUser } = useContext();

  const handleSubmit = async () => {
    if ((phone.length !== 0, code.length !== 0)) {
      const data = await loginOtp({ phone: phone, code: code });
      localStorage.setItem(`access-token`, data.data.data.token);
      router.push(`/home`);
    }
  };
  const onSignInGoogle = async () => {
    const { user } = await signInWithPopup(firebaseAuth, googleProvider);
    const result = await verifyUser(user.providerData[0]);
    if (result.isNewUser) router.push(`/register`);
    else router.push(`/`);
  };
  return (
    <section>
      <h1>Login with OTP</h1>
      <form>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Button type="primary" htmlType="submit" onClick={onSignInGoogle}>
          Login with google
        </Button>
      </form>
    </section>
  );
};

export default Otp;
