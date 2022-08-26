import MyInput from '@/components/MyInput/MyInput';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { message, Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import errorScss from '../UpdateInfor/UpdateInfor.module.scss';
import { Button } from '@/components/common';
import Image from 'next/image';
import { Loading } from '@/components/Loading/Loading';
import styleScss from './ChangeSimpleInfo.module.scss';
import { updateSimpleInfo } from '@/redux/slice/userProfileSlice';
import { IResponse } from '@/@type/responses';
import { useRouter } from 'next/router';
import { UpdateUserProfileEnum } from '@/common/enums/enum';

export const ChangeSimpleInfo: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const avatar = useAppSelector(
    (state: RootState) => state.userProfileSlice.avatar,
  );
  const name = useAppSelector(
    (state: RootState) => state.userProfileSlice.name,
  );
  const birthday = useAppSelector(
    (state: RootState) => state.userProfileSlice.birthday,
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newBirthday, setNewBirthday] = useState<string>(
    birthday.toISOString(),
  );

  const { handleBlur, errors, handleChange, handleSubmit, touched } = useFormik(
    {
      initialValues: {
        name: name,
        birthday: birthday,
      },
      onSubmit: async (value) => {
        const formData = new FormData();

        formData.append('name', value.name);
        if (newBirthday) {
          formData.append('birthday', newBirthday);
        }
        if (image) {
          formData.append('file', image);
        }
        formData.append('type', UpdateUserProfileEnum.OTHER);

        const res = (await dispatch(updateSimpleInfo(formData)))
          .payload as IResponse<string | IUserProfile>;

        if (res.status) {
          message.success('Cập nhập thông tin thành công.');
          router.push('/profile');
        } else {
          message.error('Cập nhập thông tin thất bại');
        }
      },
      validationSchema: yup.object({
        name: yup.string().required('Vui lòng nhập đủ thông tin'),
        birthday: yup.string().required('Vui lòng nhập đủ thông tin'),
      }),
    },
  );

  const handdleChangeBirthday = (date: Date, dateString: string) => {
    setNewBirthday(date.toISOString());
  };

  const handleImageClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        !file ||
        (file.type !== 'image/png' &&
          file.type !== 'image/jpg' &&
          file.type !== 'image/jpeg')
      ) {
        message.error(`Only accept png, jpeg, jpg file`);
        return;
      }
      setImage(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  return avatar ? (
    <form onSubmit={handleSubmit} className={styleScss.changeSimpleInfo}>
      <div className={styleScss.changeSimpleInfo__avatarContainer}>
        <div
          className={styleScss.changeSimpleInfo__avatarContainer__avatar}
          onClick={handleImageClick}
        >
          <Image
            src={avatarUrl ?? avatar ?? '/assets/images/default.jpg'}
            alt="avatar"
            width={100}
            height={100}
            layout="responsive"
            objectFit="cover"
          />
          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={handleInputFileChange}
            accept="image/png, image/jpeg, image/jgp"
          />
        </div>
      </div>
      <div>
        <MyInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          txtLabel={'Họ Tên'}
          isInput={true}
          defaultValue={name}
          name={'name'}
        />
        {touched.name && errors.name && (
          <div>
            <Tag
              className={errorScss.inforUserMain__form__group__error__message}
              icon={<CloseCircleOutlined />}
              color="error"
            >
              {errors.name}
            </Tag>
          </div>
        )}
      </div>
      <div>
        <MyInput
          handleBlur={handleBlur}
          handleChangeDatePicker={handdleChangeBirthday}
          txtLabel={'Ngày sinh'}
          isDatePicker={true}
          defaultValue={birthday}
          name={'birthday'}
        />
        {touched.birthday && errors.birthday && (
          <div>
            <Tag
              className={errorScss.inforUserMain__form__group__error__message}
              icon={<CloseCircleOutlined />}
              color="error"
            >
              {errors.birthday}
            </Tag>
          </div>
        )}
      </div>
      <div className={styleScss.changeSimpleInfo__button}>
        <Button
          content="Xong"
          type="submit"
          btnClass={errorScss.inforUserMain__form__btn}
        />
      </div>
    </form>
  ) : (
    <Loading />
  );
};
