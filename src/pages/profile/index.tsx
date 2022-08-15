import { IResponse } from '@/@type/responses';
import { Color, HTag } from '@/common/enums/enum';
import {
  Card,
  InfoItem,
  ItemHobby,
  ReasonPopUp,
  SectionTitle,
  SettingDesctiption,
  SettingInfo,
} from '@/components';
import { HeadPage } from '@/components/HeadPage/HeadPage';
import {
  ApplauseIcon,
  ChildIcon,
  GenderIcon,
  GraduationIcon,
  PlusIcons,
  RingIcon,
  RulerIcon,
  SettingIcon,
  WhiteWineIcon,
} from '@/components/icon';
import { Col, Row } from 'antd';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React, { ReactElement, useCallback, useRef, useState } from 'react';

const Profile = () => {
  const [settingItem, setSettingItem] = useState('');
  const [profile, setProfile] = useState<IParamGetUserProfile>({
    id: 'd4b383d9-4f68-4b9d-9089-5ac5913300bb',
    name: 'Nguyễn Văn A',
    avatar:
      'https://i.pinimg.com/564x/ca/13/ad/ca13ad41b479eae1f1e929242a2ce81d.jpg',
    email: 'nguyenvana@gmail.com',
    phone: '0869287417',
    birthday: new Date('2022-04-18T17:00:00.000Z'),
    gender: 'male',
    description: 'This is my description',
    children: 0,
    alcohol: 'sometime',
    religion: 'god',
    education: 'university',
    purposeId: '2c2dcfc9-95e7-42c5-b094-8e41c6ccb37e',
    isBlock: false,
    isVerify: false,
    album: [
      {
        id: 'b3e3c921-1d5a-4868-a4a3-3967a0c8d1af',
        url: 'https://i.pinimg.com/564x/45/27/ac/4527ace8774293c16a45f1c171ce50bb.jpg',
      },
      {
        id: '731c85da-7784-4f1c-bd2e-c8927d82dce8',
        url: 'https://i.pinimg.com/564x/b0/58/4b/b0584bc181a0139b18d136b5078d3619.jpg',
      },
      {
        id: '7c3c713a-8554-426d-b95c-c9e5bd58b769',
        url: 'https://i.pinimg.com/564x/5b/31/b5/5b31b5bc6dd9334506e54185096e955f.jpg',
      },
      {
        id: '6e76def3-4bea-483e-a87f-ac75a17fd913',
        url: 'https://i.pinimg.com/564x/a6/bd/be/a6bdbe38ff71101a3bffbdfaa1865f2d.jpg',
      },
      // {
      //   id: '16b7b406-1ed3-4741-8626-a806d697d8b7',
      //   url: 'https://i.pinimg.com/564x/96/8a/2e/968a2e218a9e9014b0edacf2455371fa.jpg',
      // }
    ],
    hobbies: [
      {
        id: 'fa7da7d3-9103-441d-8161-414a72b99120',
        name: 'mua sắm',
      },
      {
        id: 'e2f8928e-c2a2-49a0-9eb9-1072463c6e7a',
        name: 'cà phê',
      },
      {
        id: '3832b33e-abf1-4e93-8aac-5dae140b4beb',
        name: 'du lịch',
      },
      {
        id: '4a5a7ba2-d886-419a-8cb3-d4aa0197e4f7',
        name: 'đọc sách',
      },
    ],
  });
  const [purposes, setPurposes] = useState<IPurpose[]>([
    {
      id: '9ed0b18d-fe01-4f4b-8d46-7d1e1c6c0a55',
      title: 'Muốn hẹn hò',
      description: 'Where there is a will, there is a way.',
      image: '/assets/icons8-cup 1.svg',
    },
    {
      id: '2c2dcfc9-95e7-42c5-b094-8e41c6ccb37e',
      title: 'Cần người tâm sự',
      description: 'Set your target and keep trying until you reach it.',
      image: '/assets/icons8-chat-room 1.svg',
    },
    {
      id: '0a7a3d9a-cf5c-46a5-b309-60d1dfac6237',
      title: 'Tìm mối quan hệ mới',
      description: 'Never leave that till tomorrow which',
      image: '/assets/icons8-kiss.svg',
    },
  ]);

  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onOverlayClick = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.classList.remove('profileFrame-card');
      overlay.classList.remove('profileFrame-overlay-show');

      setTimeout(() => {
        card.hidden = true;
        overlay.hidden = true;
      }, 1000);
    }
  }, []);

  const openPopUp = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.hidden = false;
      overlay.hidden = false;

      setTimeout(() => {
        overlay.classList.add('profileFrame-overlay-show');
        card.classList.add('profileFrame-card');
      }, 10);
    }
  }, []);

  const openReasonSetting = useCallback(() => {
    setSettingItem('reason');
    openPopUp();
  }, []);

  const openDescritionpSetting = useCallback(() => {
    setSettingItem('description');
    openPopUp();
  }, []);

  function SwitchCase(type: string): ReactElement | undefined {
    switch (type) {
      case 'reason':
        return (
          <ReasonPopUp purposes={purposes} userPurposeId={profile.purposeId} />
        );
      case 'description':
        return (
          <SettingDesctiption
            defaultValue={'My description'}
            setDescription={() => {
              console.log('hello');
            }}
          />
        );
      default:
        return undefined;
    }
  }

  return (
    <section className="profileFrame">
      <HeadPage
        hTag={HTag.h2}
        title={'Tài khoản'}
        icon={<SettingIcon />}
        colorTitle={Color.clr_neutral_100}
        onIconClick={() => {
          alert('hello');
        }}
      />
      <div className="profileFrame-simpleInfo">
        <Image
          className="profileFrame-simpleInfo-image"
          alt="avatar"
          src={profile.avatar}
          width={40}
          height={40}
        />
        <div>
          <h3 className="profileFrame-simpleInfo-nameAndAge">
            {profile.name},30t
          </h3>
          <p className="profileFrame-simpleInfo-reasonHere">“Muốn hẹn hò”</p>
        </div>
      </div>
      <div className="profileFrame-album">
        <Row gutter={[10, 10]}>
          {profile.album.length > 0 ? (
            <Col span={16}>
              <div>
                <Image
                  className="profileFrame-album-image"
                  alt="avatar"
                  src={profile.album[0].url}
                  width={225}
                  height={225}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
            </Col>
          ) : null}
          {profile.album.length > 1 ? (
            <Col span={8}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <Image
                    className="profileFrame-album-image"
                    alt="avatar"
                    src={profile.album[1].url}
                    width={109}
                    height={109}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="top"
                  />
                </Col>
                <Col span={24}>
                  {profile.album.length > 2 ? (
                    <Image
                      className="profileFrame-album-image"
                      alt="avatar"
                      src={profile.album[2].url}
                      width={109}
                      height={109}
                      layout="responsive"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  ) : (
                    <div className="profileFrame-album-upload">
                      <div>
                        <PlusIcons />
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          ) : null}
          {profile.album.length > 3 ? (
            <Col span={8}>
              <Image
                className="profileFrame-album-image"
                alt="avatar"
                src={profile.album[3].url}
                width={109}
                height={109}
                layout="responsive"
                objectFit="cover"
                objectPosition="top"
              />
            </Col>
          ) : null}
          {profile.album.length === 5 ? (
            <Col span={8}>
              <Image
                className="profileFrame-album-image"
                alt="avatar"
                src={profile.album[4].url}
                width={109}
                height={109}
                layout="responsive"
                objectFit="cover"
                objectPosition="top"
              />
            </Col>
          ) : null}
          {profile.album.length > 5 ? (
            <Col span={8}>
              <p className="profileFrame-album-remain">+12</p>
              <div className="profileFrame-album-image-count">
                <Image
                  alt="avatar"
                  src={profile.album[4].url}
                  width={109}
                  height={109}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
            </Col>
          ) : null}
          {profile.album.length !== 2 ? (
            <Col span={8}>
              <div className="profileFrame-album-upload">
                <div>
                  <PlusIcons />
                </div>
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
      <div className="profileFrame-settingInfo">
        <SettingInfo
          title={'Tại sao bạn lại ở đây'}
          content={'Muốn hẹn hò'}
          onIconClick={openReasonSetting}
        />
        <SettingInfo
          title={'Giới thiệu bản thân'}
          content={'Ăn cơm phải có anh'}
          onIconClick={openDescritionpSetting}
        />
      </div>
      <div className="profileFrame-info">
        <SectionTitle title={'Thông tin'} marginBottom={10} />
        <div className="profileFrame-info-infoItems">
          <InfoItem icon={<RulerIcon />} title={'Chiều cao'} value={'170cm'} />
          <InfoItem icon={<RingIcon />} title={'Hôn nhân'} value={'Độc thân'} />
          <InfoItem
            icon={<ChildIcon />}
            title={'Chiều cao'}
            value={'Không có'}
          />
          <InfoItem
            icon={<WhiteWineIcon />}
            title={'Rựu bia'}
            value={'Không bao giờ'}
          />
          <InfoItem
            icon={<GenderIcon />}
            title={'Giới tính'}
            value={'Giới tính thẳng'}
          />
          <InfoItem
            icon={<ApplauseIcon />}
            title={'Tôn giáo'}
            value={'Không'}
          />
          <InfoItem
            icon={<GraduationIcon />}
            title={'Học vấn'}
            value={'Không'}
          />
        </div>
      </div>
      <div className="profileFrame-hobby">
        <SectionTitle
          title={'Sở thích'}
          editTitle={'Chỉnh sửa'}
          marginBottom={10}
        />
        <div className="profileFrame-hobby-hobbyItems">
          <ItemHobby title={'mua sắm'} color={Color.clr_light_pink} />
          <ItemHobby title={'cà phê'} color={Color.clr_light_yellow} />
          <ItemHobby title={'du lịch'} color={Color.clr_light_blue} />
          <ItemHobby title={'đọc sách'} color={Color.clr_light_green} />
        </div>
      </div>
      <Card height={511} ref={cardRef}>
        {SwitchCase(settingItem)}
      </Card>
      <div
        className="profileFrame-overlay"
        hidden
        onClick={onOverlayClick}
        ref={overlayRef}
      ></div>
      <div>
        <input
          type="radio"
          name="reason"
          value={1}
          checked
          onChange={() => {
            console.log(1);
          }}
        />
        <input
          type="radio"
          name="reason"
          value={2}
          onChange={() => {
            console.log(2);
          }}
        />
        <input
          type="radio"
          name="reason"
          value={2}
          onChange={() => {
            console.log(3);
          }}
        />
      </div>
    </section>
  );
};

// export const getStaticProps = async () => {
//   const resData: IResponse<IParamGetUserProfile> = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/users/private/user-profile`,
//     {
//       method: 'GET',
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNGIzODNkOS00ZjY4LTRiOWQtOTA4OS01YWM1OTEzMzAwYmIiLCJwaG9uZSI6IjA4NjkyODc0MTciLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDUzNzU1MiwiZXhwIjoxNjYwNjIzOTUyfQ.tn3OMPdSTkImQI31OUxQPv1LY0gB615HOsalKEqDD4U',
//       },
//     },
//   ).then((res) => res.json());

//   if (!resData.status) console.log(`Fail to fetch data from server.`);
//   const userProfile = resData.data as IParamGetUserProfile;

//   return {
//     props: {
//       userProfile,
//     },
//   };
// };

export default Profile;
