import { IResponse } from '@/@type/responses';
import {
  OTP_CANNOT_BE_CREATED_MORE_THAN_ONCE_IN_5_MINUTES,
  PLEASE_TRY_AGAIN_AFTER_5_MINUES,
  PLEASE_TRY_AGAIN_A_FEW_MINUTES,
  USER_WAS_BLOCKED,
} from '@/common/constantArlertErrors';
import { useAppDispatch } from '@/redux';
import {
  addPhoneNumber,
  callAPISendOTP,
  setStepLogin,
} from '@/redux/slice/userSlice';
import { phoneValidationSchema } from '@/Validation/Validations';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Input, message, Tag } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import imgFlagVN from '../../../public/assets/flag-vn.svg';
import imgFillPhone from '../../../public/assets/images/img-phone.svg';
import { Button } from '../../components/common/Button/Button';
import Content from '../../components/Content/Content';
import styleScss from './SendOTP.module.scss';

const SendOTP = () => {
  const dispatch = useAppDispatch();

  const handleAfterCallApi = (results: IResponse<string>) => {
    if (results.status) {
      message.success('Vui lòng điền OTP đã nhận được');
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(addPhoneNumber(values));
      dispatch(setStepLogin());
    } else {
      switch (results.message) {
        case USER_WAS_BLOCKED:
          message.error(
            'Bạn đã bị chặn vui lòng liên hệ quản lý để được bỏ chặn',
          );
          break;
        default:
          message.error('Vui lòng thử lại sau 5 phút');
      }
    }
  };
  const handleDisablePaste = (e: any) => {
    e.preventDefault();
    return false;
  };
  const handleKeyPress = (e: any) => {
    console.log(e.target.value);
    if (/^[0-9]*$/.test(e.key)) {
      e.value = e.key;
    }
  };

  const { handleBlur, errors, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: { phone: '' },
      onSubmit: async (values) => {
        const results: IResponse<string> = (
          await dispatch(callAPISendOTP(values))
        ).payload;
        handleAfterCallApi(results);
      },
      validationSchema: phoneValidationSchema,
    });
  return (
    <>
      <ToastContainer className={styleScss.toastContainer} />
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
              onPaste={handleDisablePaste}
              maxLength={10}
              value={values.phone}
              placeholder="Nhập số điện thoại"
              name="phone"
              onChange={(e: any) => {
                if (isNaN(e.target.value)) {
                  return false;
                } else {
                  handleChange(e);
                }
              }}
              onBlur={handleBlur}
              onInput={(e: any) => handleKeyPress(e)}
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

          <div className={styleScss.sendOTP__btn}>
            <Button
              btnClass=""
              isHaveIcon={true}
              type="submit"
              content="Xác thực"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SendOTP;
