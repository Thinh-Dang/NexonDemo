import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Layout } from '@/components';
import { Login, Otp } from '@/containers';
import { useSession } from 'next-auth/react';

import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../redux';
import { checkOtp, loginSocial } from '../../redux/slice/userSlice';

import userApi from '@/services/user.api';

const LoginHome: NextPage = () => {
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');

  const formikLogin = useFormik<IFormLoginPage>({
    initialValues: {
      phone: '',
    },
    onSubmit: async (values: IFormLoginPage): Promise<void> => {
      const requestLogin: IFormLoginPage = {
        ...values,
      };

      await userApi
        .login(requestLogin)
        .then(() => {
          setIsLogin(true);
          setPhone(values.phone);
        })
        .catch(() => {
          Swal.fire({
            title: 'Login failed !!!',
            icon: 'error',
          });
        });
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          'Phone number is not valid',
        )
        .required('Please enter phone'),
    }),
  });

  const formikOtp = useFormik<IFormOtpPage>({
    initialValues: {
      verificationCode: '',
      phone: '',
    },
    onSubmit: async (values: IFormOtpPage): Promise<void> => {
      const requestOtp: IFormOtpPage = {
        ...values,
        phone: phone,
      };

      const isVerifyOtp = (await dispatch(checkOtp(requestOtp))).payload;

      if (isVerifyOtp) {
        Swal.fire({
          title: 'Login Success',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Wrong OTP !!!',
          icon: 'error',
        });
      }
    },
    validationSchema: Yup.object().shape({
      verificationCode: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits')
        .required('Please enter otp'),
    }),
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const requestLoginSocial: ILoginWithSocialPage = {
        accessToken: session.accessToken as string,
        typeSocial: session.typeSocial as string,
        userData: session.user,
      };

      dispatch(loginSocial(requestLoginSocial));
    }
  }, [session, dispatch]);

  return (
    <Layout title="Login" isHeader={false} isFooter={false}>
      <>
        {!isLogin && <Login formik={formikLogin} session={session} />}
        {isLogin && <Otp formik={formikOtp} />}
      </>
    </Layout>
  );
};

export default LoginHome;
