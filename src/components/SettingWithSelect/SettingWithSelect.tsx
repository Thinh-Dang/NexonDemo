import { ISettingWithSelect } from '@/@type/components';
import { useAppDispatch } from '@/redux';
import { Tag } from 'antd';
import { useFormik } from 'formik';
import { FC, useCallback, useState } from 'react';
import { Button } from '../common';
import { MySelect } from '../common/Select/MySelect';
import styleScss from '../../containers/UpdateInfor/UpdateInfor.module.scss';
import { IUpdateUserProfile } from '@/@type/services';
import { updateUserProfile } from '@/redux/slice/userProfileSlice';
import { IResponse } from '@/@type/responses';
import * as yup from 'yup';
import { CloseCircleOutlined } from '@ant-design/icons';
import buttonScss from '../../containers/ChangeSimpleInfo/ChangeSimpleInfo.module.scss';

export const SettingWithSelect: FC<ISettingWithSelect> = ({
  defaultValue,
  title,
  source,
  name,
  settingType,
  onClosePopUp,
}) => {
  const [valueSelect, setValueSelect] = useState('');

  const dispatch = useAppDispatch();

  const { errors, handleSubmit, touched } = useFormik({
    initialValues: {
      [name]: defaultValue,
    },
    onSubmit: async (value) => {
      value[name] = valueSelect;

      const valueRequest: IUpdateUserProfile = {
        ...value,
        type: settingType,
      };

      const res = (await dispatch(updateUserProfile(valueRequest)))
        .payload as IResponse<string | IUserProfile>;

      if (!res.status) alert('Update fail');

      onClosePopUp();
    },
    validationSchema: yup.object({
      [name]: yup.string().required('Vui lòng nhập đủ thông tin'),
    }),
  });

  const handleSelectChange = useCallback((value: string) => {
    setValueSelect(value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styleScss.inforUserMain__form}>
      <div>
        <MySelect
          source={source}
          defaultValue={defaultValue}
          title={title}
          onChange={handleSelectChange}
        />
        {touched[name] && errors[name] && (
          <div>
            <Tag
              className={styleScss.inforUserMain__form__group__error__message}
              icon={<CloseCircleOutlined />}
              color="error"
            >
              {errors[name]}
            </Tag>
          </div>
        )}
      </div>
      <div className={buttonScss.changeSimpleInfo__button}>
        <Button
          content="Xong"
          type="submit"
          btnClass={styleScss.inforUserMain__form__btn}
        />
      </div>
    </form>
  );
};
