import Image from 'next/image';
import React from 'react';
import Content from '../../components/Content/Content';
import styleScss from './SendOTP.module.scss';
import { Button } from '../../components/common/Button/Button';
import imgFillPhone from '../../../public/assets/images/img-phone.svg';
import imgFlagVN from '../../../public/assets/flag-vn.svg';
import { Input, Tag } from 'antd';
import { useFormik } from 'formik';
import { CloseCircleOutlined } from '@ant-design/icons';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { addPhoneNumber, callAPISendOTP } from '@/redux/slice/userSlice';
import Swal from 'sweetalert2';
import { phoneValidationSchema } from '@/Validation/Validations';
import { IResponse } from '@/@type/responses';

const SendOTP = () => {
  const dispatch = useAppDispatch();
  const { isStatusApi } = useAppSelector((state: RootState) => state.userSlice);

  const { handleBlur, errors, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: { phone: '' },
      onSubmit: async (values) => {
        dispatch(addPhoneNumber(values));
        const result = (await dispatch(callAPISendOTP(values)))
          .payload as IResponse;
        console.log(result.status);
        if (result.status) {
          Swal.fire('Good job!', 'You clicked the button!', 'success');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      },
      validationSchema: phoneValidationSchema,
    });

  return (
    <div className={styleScss.sendOTP}>
      <Image src={imgFillPhone} alt="Zodinet" />
      <Content
        classContent={styleScss.sendOTP__content}
        contentTitle="Nhập số điện thoại để tiếp tục"
        contentText="Vui lòng nhập số điện thoại để đăng nhập và mua sắm tại CLM"
      />
      <form onSubmit={handleSubmit}>
        <div className={styleScss.sendOTP__group}>
          <div className={styleScss.sendOTP__group__flag}>
            <Image src={imgFlagVN} alt="Zodinet" />
          </div>
          <Input
            maxLength={11}
            value={values.phone}
            placeholder="Nhập số điện thoại"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.phone && errors.phone && (
          <Tag
            className={styleScss.sendOTP__error__message}
            icon={<CloseCircleOutlined />}
            color="error"
          >
            {errors.phone}
          </Tag>
        )}
        <Button
          btnClass=""
          isHaveIcon={true}
          type="submit"
          content="Xác thực"
        />
      </form>
    </div>
  );
};

export default SendOTP;
