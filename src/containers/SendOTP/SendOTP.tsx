import { IResponse } from '@/@type/responses';
import { USER_WAS_BLOCKED } from '@/common/constantArlertErrors';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  addPhoneNumber,
  callAPISendOTP,
  setLoading,
  setStepLogin,
} from '@/redux/slice/userSlice';
import { phoneValidationSchema } from '@/Validation/Validations';
import { CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, message, Spin, Tag } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import imgFlagVN from '../../../public/assets/flag-vn.svg';
import imgFillPhone from '../../../public/assets/images/img-phone.svg';
import { Button } from '../../components/common/Button/Button';
import Content from '../../components/Content/Content';
import styleScss from './SendOTP.module.scss';

const SendOTP = () => {
  const myState = useAppSelector((state: RootState) => state.userSlice);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useAppDispatch();

  const handleAfterCallApi = (results: IResponse<string>) => {
    dispatch(setLoading(false));
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
    if (/^[0-9]*$/.test(e.key)) {
      e.value = e.key;
    }
  };

  const { handleBlur, errors, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: { phone: '' },
      onSubmit: async (values) => {
        dispatch(setLoading(true));
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(setStepLogin());
        }, 3000);
        // const results = (await dispatch(callAPISendOTP(values)))
        //   .payload as IResponse<string>;
        // handleAfterCallApi(results);
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
            {myState.isLoading ? (
              <Button
                btnClass={styleScss.sendOTP__btn__loading}
                isHaveIcon={false}
                type="button"
                content={<Spin style={{ color: '#fff' }} indicator={antIcon} />}
              />
            ) : (
              <Button
                btnClass=""
                isHaveIcon={true}
                type="submit"
                content="Xác thực"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SendOTP;
