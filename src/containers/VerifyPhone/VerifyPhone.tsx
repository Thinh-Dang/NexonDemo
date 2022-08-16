import Image from 'next/image';
import React from 'react';
import Content from '../../components/Content/Content';
import styleScss from './VerifyPhone.module.scss';
import { Input } from 'antd';
import { Button } from '../../components/common/Button/Button';
import MyInput from '@/components/MyInput/MyInput';
import imgFillPhone from '../../../public/assets/images/img-phone.svg';
import imgOtpPage from '../../../public/assets/images/img-otp.svg';
import imgFlagVN from '../../../public/assets/flag-vn.svg';

type Props = {
  isPhone: boolean;
};

const VerifyPhone = ({ isPhone }: Props) => {
  if (!isPhone) {
    return (
      <div style={{ marginTop: '4.7rem' }}>
        <Image src={imgFillPhone} alt="Zodinet" />
        <Content
          classContent={styleScss.verifyPhone}
          contentTitle="Nhập số điện thoại để tiếp tục"
          contentText="Vui lòng nhập số điện thoại để đăng nhập và mua sắm tại CLM"
        />
        <div className={styleScss.verifyPhone__group}>
          <div className={styleScss.verifyPhone__group__flag}>
            <Image src={imgFlagVN} alt="Zodinet" />
          </div>
          <Input placeholder="Nhập số điện thoại" />
        </div>
        <Button
          btnClass=""
          isHaveIcon={true}
          type="button"
          content="Xác thực"
        />
      </div>
    );
  }
  return (
    <div style={{ marginTop: '4.7rem' }}>
      <Image src={imgOtpPage} alt="Zodinet" />
      <Content
        classContent={styleScss.verifyPhone}
        contentTitle="Mã xác thực"
        contentText="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
      />
      <MyInput isInput={false} />
      <Button btnClass="" isHaveIcon={true} type="button" content="Tiếp tục" />
    </div>
  );
};

export default VerifyPhone;
