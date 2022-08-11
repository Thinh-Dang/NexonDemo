import { NextPage } from 'next';
import { Layout } from '../../layouts/Layout';
import { Otp, SignUp, EnterPhone } from '../../containers';

import * as Yup from 'yup';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { RootState } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux';
import { enterPhone, checkOtp, register } from '../../redux/slice/userSlice';

import userApi from '../../services/userApi';

const Register: NextPage = () => {
  const router = useRouter();
  const infoUser = useAppSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();

  const formikEnterPhone = useFormik<IFormEnterPhonePage>({
    initialValues: {
      phone: '',
    },
    onSubmit: async (values: IFormEnterPhonePage): Promise<void> => {
      await dispatch(enterPhone(values));
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
        phone: infoUser.phone,
      };

      await dispatch(checkOtp(requestOtp));
    },
    validationSchema: Yup.object().shape({
      verificationCode: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits')
        .required('Please enter otp'),
    }),
  });

  const formikRegister = useFormik<IFormRegisterPage>({
    initialValues: {
      phone: '',
      name: '',
      email: '',
      birthday: '',
      gender: '',
      avatar: 'string',
      is_verify: true,
    },
    onSubmit: async (values: IFormRegisterPage) => {
      const requestRegister: IFormRegisterPage = {
        ...values,
        phone: infoUser.phone,
      };

      const dataRegister = (await dispatch(register({ ...requestRegister })))
        .payload;

      if (dataRegister) {
        Swal.fire({
          title: 'Register Success !!!',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Register Failed !!!',
          icon: 'error',
        });
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(5, 'Name must be longer than 5 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Please enter valid name'),
      email: Yup.string()
        .email('Please enter valid email')
        .required('Please enter valid email'),
      birthday: Yup.string()
        .test('DOB', 'Please choose a valid date of birth', (value) => {
          return moment().diff(moment(value), 'years') >= 10;
        })
        .required('Please valid birthday'),
    }),
  });

  return (
    <Layout title="Sign Up" isHeader={false} isFooter={false}>
      <>
        {!infoUser.phone && <EnterPhone formik={formikEnterPhone} />}
        {!infoUser.isVerifyOtp && infoUser.phone && <Otp formik={formikOtp} />}
        {infoUser.isVerifyOtp && <SignUp formik={formikRegister} />}
      </>
    </Layout>
  );
};

export default Register;
