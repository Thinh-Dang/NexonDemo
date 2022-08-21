import { IImageCard } from '@/@type/components';
import { IUserImages } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import { useAppDispatch } from '@/redux';
import { deleteImage } from '@/redux/slice/userProfileSlice';
import { message } from 'antd';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import styleScss from './ImageCard.module.scss';

export const ImageCard: FC<IImageCard> = ({
  id,
  url,
  onFavorite,
  isFavorite,
  isAvailableFavorite,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const res = (await dispatch(deleteImage({ id: id })))
      .payload as IResponse<string>;
    if (!res.status) {
      message.error('Delete image fail');
    }
  };

  const handleFavorite = useCallback(() => {
    if (typeof onFavorite === 'function') onFavorite(id);
  }, []);

  return (
    <div className={styleScss.imageCard}>
      <Image
        alt="album"
        layout="fill"
        src={url}
        objectFit="cover"
        objectPosition="top"
      />
      <div className={styleScss.imageCard__icons}>
        <div className={styleScss.imageCard__icon} onClick={handleDelete}>
          <img src="./assets/images/Close.svg" alt="delete" />
        </div>
        {isFavorite && (
          <div className={styleScss.imageCard__icon} onClick={handleFavorite}>
            <img src="./assets/images/Union.svg" alt="heart" />
          </div>
        )}
        {!isFavorite && isAvailableFavorite && (
          <div className={styleScss.imageCard__icon} onClick={handleFavorite}>
            <img src="./assets/images/UnFavorite.svg" alt="heart" />
          </div>
        )}
      </div>
    </div>
  );
};
