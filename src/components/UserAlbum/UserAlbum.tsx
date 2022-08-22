import { IUserAlbum } from '@/@type/components';
import { Col, message, Row } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styleScss from './UserAlbum.module.scss';
import { PlusIcons } from '../icon';
import { useRouter } from 'next/router';
import { EffectCreative, SwiperOptions } from 'swiper';
import { ImageCard } from '../ImageCard/ImageCard';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { favoriteCount } from '@/utils/countFavorite';
import { useAppDispatch } from '@/redux';
import { changeFavoriteImage } from '@/redux/slice/userProfileSlice';
import { IResponse } from '@/@type/responses';
import { IUserImages } from '@/@type/params';
import SwiperCore from 'swiper';

export const UserAlbum: FC<IUserAlbum> = ({ album }) => {
  const [countFavorite, setCountFaovrite] = useState(favoriteCount(album));
  const [swiper, setSwiper] = useState<SwiperCore>();

  const slideTo = (index: number) => {
    if (swiper) swiper.slideTo(index, 1000);
  };

  const maxFavorite = parseInt(process.env.NEXT_pUBLIC_MAX_FAVORITE ?? '3');

  const dispatch = useAppDispatch();

  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const handdleOpenUpLoad = useCallback(() => {
    router.push('/upload-images');
  }, []);

  const handleImageClick = (index: number) => {
    if (ref.current) {
      ref.current.hidden = false;
      slideTo(index);
    }
  };

  const handleFavorite = useCallback(async (id: string) => {
    const res = (await dispatch(changeFavoriteImage({ id: id })))
      .payload as IResponse<string | IUserImages>;

    if (res.status) {
      const image = res.data as IUserImages;
      if (image.isFavorite) {
        setCountFaovrite((value) => {
          if (value < maxFavorite) return value + 1;
          return value;
        });
      } else {
        setCountFaovrite((value) => {
          if (value > 1) return value - 1;
          return value;
        });
      }
    } else {
      message.error('Change favorite image fail.');
    }
  }, []);

  const handleCloseOvelay = useCallback(() => {
    if (ref.current) ref.current.hidden = true;
  }, []);

  return (
    <>
      <div className={styleScss.userAlbum}>
        <Row gutter={[10, 10]}>
          {album.length > 0 ? (
            <Col span={16}>
              <div>
                <Image
                  onClick={() => {
                    handleImageClick(0);
                  }}
                  className={styleScss.userAlbum__image}
                  alt="avatar"
                  src={album[0].url}
                  width={225}
                  height={225}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
            </Col>
          ) : null}
          {album.length > 1 ? (
            <Col span={8}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <Image
                    className={styleScss.userAlbum__image}
                    onClick={() => {
                      handleImageClick(1);
                    }}
                    alt="avatar"
                    src={album[1].url}
                    width={109}
                    height={109}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="top"
                  />
                </Col>
                <Col span={24}>
                  {album.length > 2 ? (
                    <Image
                      className={styleScss.userAlbum__image}
                      onClick={() => {
                        handleImageClick(2);
                      }}
                      alt="avatar"
                      src={album[2].url}
                      width={109}
                      height={109}
                      layout="responsive"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  ) : (
                    <div
                      className={styleScss.userAlbum__upload}
                      onClick={handdleOpenUpLoad}
                    >
                      <div>
                        <PlusIcons />
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          ) : null}
          {album.length > 3 ? (
            <Col span={8}>
              <Image
                className={styleScss.userAlbum__image}
                onClick={() => {
                  handleImageClick(3);
                }}
                alt="avatar"
                src={album[3].url}
                width={109}
                height={109}
                layout="responsive"
                objectFit="cover"
                objectPosition="top"
              />
            </Col>
          ) : null}
          {album.length === 5 ? (
            <Col span={8}>
              <Image
                className={styleScss.userAlbum__image}
                onClick={() => {
                  handleImageClick(4);
                }}
                alt="avatar"
                src={album[4].url}
                width={109}
                height={109}
                layout="responsive"
                objectFit="cover"
                objectPosition="top"
              />
            </Col>
          ) : null}
          {album.length > 5 ? (
            <Col span={8}>
              <p className={styleScss.userAlbum__remain}>+{album.length - 5}</p>
              <div
                className={styleScss.userAlbum__image__count}
                onClick={() => {
                  handleImageClick(4);
                }}
              >
                <Image
                  alt="avatar"
                  src={album[4].url}
                  width={109}
                  height={109}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
            </Col>
          ) : null}
          {album.length !== 2 ? (
            <Col span={8}>
              <div
                className={styleScss.userAlbum__upload}
                onClick={handdleOpenUpLoad}
              >
                <div>
                  <PlusIcons />
                </div>
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
      <div hidden ref={ref}>
        <div
          className={styleScss.userAlbum__overlay}
          onClick={handleCloseOvelay}
        ></div>
        <div className={styleScss.userAlbum__swipper}>
          <Swiper
            onSwiper={(e) => setSwiper(e)}
            className="findingPage-container"
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-130%', 0, -500],
              },
              next: {
                shadow: true,
                translate: ['130%', 0, -500],
              },
            }}
            modules={[EffectCreative]}
          >
            {album.length > 0 &&
              album.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="findingPage-container-swiper"
                >
                  <ImageCard
                    id={image.id}
                    url={image.url}
                    onFavorite={handleFavorite}
                    isFavorite={image.isFavorite}
                    isAvailableFavorite={countFavorite < maxFavorite}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
