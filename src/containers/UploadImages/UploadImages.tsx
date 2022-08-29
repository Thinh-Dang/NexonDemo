import { IUserImages } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import { Button } from '@/components/common';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { uploadImages } from '@/redux/slice/userProfileSlice';
import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { message, Spin, Tag, Upload } from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import buttonScss from '../../containers/UpdateInfor/UpdateInfor.module.scss';
import styleScss from './UploadImages.module.scss';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
);

export const UploadImages: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // let albumLength = useAppSelector(
  //   (state: RootState) => state.userProfileSlice.album.length,
  // );

  const maxAlbum = parseInt(process.env.NEXT_PUBLIC_ALBUM_LENGTH ?? '10');

  const [fileListPreview, setFileListPreview] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isEmty, setIsEmty] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [albumLength, setAlbumLength] = useState(
    useAppSelector((state: RootState) => state.userProfileSlice.album.length),
  );

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);

      const newFileListPreview = fileListPreview.slice();
      newFileListPreview.splice(index, 1);
      setFileListPreview(newFileListPreview);
    },
    beforeUpload: (file) => {
      const isImageFile =
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg';

      if (!isImageFile) {
        message.error(`${file.name} is not a image file`);
      } else {
        const url = URL.createObjectURL(file);

        const uploadFile = { ...file, url: url };

        setFileListPreview((list) => {
          if (list.length < maxAlbum - albumLength) {
            return [...list, uploadFile];
          }
          return list;
        });
        setFileList((list) => {
          if (list.length < maxAlbum - albumLength) {
            return [...list, file];
          }
          return list;
        });

        if (isEmty) setIsEmty(false);
      }
      return true;
    },
    fileList: fileListPreview,
    listType: 'picture-card',
    multiple: true,
    accept: '.png,.jpg,.jpeg',
  };

  return (
    <form
      className={styleScss.uploadImages}
      onSubmit={async (e) => {
        e.preventDefault();

        if (fileList.length === 0) {
          setIsEmty(true);
          return;
        }

        setIsFormSubmit(true);
        setIsEmty(false);

        const formdata = new FormData();
        for (let i = 0; i < fileList.length; i++) {
          formdata.append('images', fileList[i] as RcFile);
        }

        const res = (await dispatch(uploadImages(formdata)))
          .payload as IResponse<string | IUserImages[]>;

        if (!res.status) {
          message.error('Upload images fail.');
          setIsFormSubmit(false);
        } else {
          message.success('Upload images success');
          router.push('/profile');
        }
      }}
    >
      <div className={styleScss.uploadImages__remind}>
        Bạn chỉ có thể up thêm tối đa {maxAlbum - albumLength} hình
      </div>
      <div className={styleScss.uploadImages__images}>
        <Upload {...props}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
          </div>
        </Upload>
        {isEmty && (
          <div>
            <Tag
              className={styleScss.inforUserMain__form__group__error__message}
              icon={<CloseCircleOutlined />}
              color="error"
            >
              Vui lòng chọn ảnh.
            </Tag>
          </div>
        )}
      </div>
      <Button
        content={isFormSubmit ? <Spin indicator={antIcon} /> : 'Xong'}
        type="submit"
        btnClass={buttonScss.inforUserMain__form__btn}
      />
    </form>
  );
};
