import * as yup from 'yup';

export const phoneValidationSchema = yup.object({
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      'Vui Lòng Nhập Đúng Số Điện Thoại',
    ),
});
export const OTPValidationSchema = yup.object({
  code: yup.string().required('Vui Lòng Nhập OTP đã được gửi'),
});
export const inForUserSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên'),
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập đúng email'),
});
