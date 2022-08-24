import { IResponse } from '@/@type/responses';
import {
  PLEASE_TRY_AGAIN_AFTER_5_MINUES,
  PLEASE_TRY_AGAIN_A_FEW_MINUTES,
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
      dispatch(addPhoneNumber(values));
      dispatch(setStepLogin());
    } else {
      switch (results.message) {
        case PLEASE_TRY_AGAIN_AFTER_5_MINUES:
          message.error('Vui lòng thử lai sau 5 phút');
          break;
        case PLEASE_TRY_AGAIN_A_FEW_MINUTES:
          message.error('Vui lòng thử lai sau giây lát');
          break;
      }
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
              maxLength={10}
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
