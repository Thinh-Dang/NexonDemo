import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import Image from 'next/image';
import React from 'react';
import imgInfor from '../../../public/assets/Frame 470 - Info.svg';
import styleScss from './UpdateInfor.module.scss';
type Props = {};

const UpdateInfor = (props: Props) => {
  return (
    <div className={styleScss.inforUserMain}>
      <Image src={imgInfor} alt="Zodinet" />
      <Content
        classContent={styleScss.inforUserMain__content}
        contentTitle="Thông tin cá nhân"
        contentText="Vui lòng nhập thông tin cá nhân của bạn đẻ hoàn thành đăng nhập"
      />
      <form className={styleScss.inforUserMain__form}>
        <div className={styleScss.inforUserMain__form__group}>
          <MyInput
            txtLabel="Họ tên"
            txtPlaceholder="Ví dụ: Trần Ngọc Tâm"
            isInput={true}
          />
          <MyInput
            txtLabel="Email"
            txtPlaceholder="Ví dụ: tamtn@hehe.com"
            isInput={true}
          />
          <MyInput isDatePicker={true} />
          <MyInput isSelection={true} />
        </div>
        <Button
          content="Xong"
          type="submit"
          btnClass={styleScss.inforUserMain__form__btn}
        />
      </form>
    </div>
  );
};

export default UpdateInfor;
