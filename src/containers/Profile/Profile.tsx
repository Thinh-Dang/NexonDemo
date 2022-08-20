import { IPurpose } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import { IUpdateUserProfile } from '@/@type/services';
import {
  Color,
  HTag,
  InputEnum,
  OpenSettingProile,
  UpdateUserProfileEnum,
} from '@/common/enums/enum';
import {
  AlcoholSource,
  EducationSource,
  GenderSource,
  MaritalSource,
  ReligionSource,
} from '@/common/selectSource/selectSource';
import {
  Card,
  HeadPage,
  InfoItem,
  ItemHobby,
  ReasonPopUp,
  SectionTitle,
  SettingHobby,
  SettingInfo,
  SettingWithInput,
  SettingWithSelect,
} from '@/components';
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
import Loading from '@/components/Loading/Loading';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { updateUserProfile } from '@/redux/slice/userProfileSlice';
import {
  calculateAge,
  ConvertAlcoholEnum,
  ConvertEducationEnum,
  ConvertGenderEnum,
  ConvertMaritalStatusEnum,
  ConvertReligionEnum,
  pickColor,
} from '@/utils';
import { Col, Row } from 'antd';
import Image from 'next/image';
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import styleCss from './Profile.module.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state: RootState) => state.userProfileSlice);

  const [settingItem, setSettingItem] = useState('');
  const [purposes, setPurposes] = useState<IPurpose[]>([
    {
      id: '55f67ae4-27c1-4c85-989d-d54fec64aa1a',
      title: 'Muốn hẹn hò',
      description: 'Where there is a will, there is a way.',
      image: '/assets/images/icons8-cup 1.svg',
    },
    {
      id: 'b8c1aca0-97b6-406f-b7ea-fd3ef7d65039',
      title: 'Cần người tâm sự',
      description: 'Set your target and keep trying until you reach it.',
      image: '/assets/images/icons8-chat-room 1.svg',
    },
    {
      id: '620a770e-9eb5-4c1c-8290-c1ecc37d40dd',
      title: 'Tìm mối quan hệ mới',
      description: 'Never leave that till tomorrow which',
      image: '/assets/icons8-kiss.svg',
    },
  ]);

  const getPurposetitle = (id: string): string | undefined => {
    const purpose = purposes.find((item) => item.id === id);
    if (!purpose) return undefined;
    return purpose.title;
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onOverlayClick = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.classList.remove(styleCss['profileFrame-card']);
      overlay.classList.remove(styleCss['profileFrame__overlay-show']);

      setTimeout(() => {
        card.hidden = true;
        overlay.hidden = true;
        setSettingItem('delete');
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
        overlay.classList.add(styleCss['profileFrame__overlay-show']);
        card.classList.add(styleCss['profileFrame-card']);
      }, 10);
    }
  }, []);

  const openSetting = useCallback((type: OpenSettingProile) => {
    setSettingItem(type);
    openPopUp();
  }, []);

  const onSubmitChange = useCallback(async (value: IUpdateUserProfile) => {
    console.log('Change user profile');
    console.log(value);
    const res = (await dispatch(updateUserProfile(value))).payload as IResponse<
      string | IUserProfile
    >;

    if (!res.status) alert('Update fail');
  }, []);

  const changeReason = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      onSubmitChange({
        purposeId: event.target.value,
        type: UpdateUserProfileEnum.PURPOSEID,
      });
    },
    [],
  );

  function SwitchCase(type: string): ReactElement | undefined {
    switch (type) {
      case OpenSettingProile.REASON:
        return (
          <ReasonPopUp
            purposes={purposes}
            userPurposeId={profile.purposeId}
            onChange={changeReason}
          />
        );
      case OpenSettingProile.DESCRIPTION:
        return (
          <SettingWithInput
            defaultValue={profile.description}
            type={InputEnum.TEXT}
            title={'Giới thiệu bản thân'}
            isTextArea={true}
            name={'description'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.DESCRIPTION}
          />
        );
      case OpenSettingProile.HEIGHT:
        return (
          <SettingWithInput
            defaultValue={profile.height}
            type={InputEnum.NUMBER}
            title={'Chiều cao'}
            name={'height'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.HEIGHT}
          />
        );
      case OpenSettingProile.MARITAL:
        return (
          <SettingWithSelect
            defaultValue={profile.maritalStatus}
            title={'Tình trạng hôn nhân'}
            source={MaritalSource()}
            name={'maritalStatus'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.MARITAL_STATUS}
          />
        );
      case OpenSettingProile.ALCOHOL:
        return (
          <SettingWithSelect
            defaultValue={profile.alcohol}
            title={'Rựa bia'}
            name={'alcohol'}
            source={AlcoholSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.ALCOHOL}
          />
        );
      case OpenSettingProile.GENDER:
        return (
          <SettingWithSelect
            defaultValue={profile.gender}
            title={'Giới tính'}
            name={'gender'}
            source={GenderSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.GENDER}
          />
        );
      case OpenSettingProile.RELIGION:
        return (
          <SettingWithSelect
            defaultValue={profile.religion}
            title={'Tôn giáo'}
            name={'religion'}
            source={ReligionSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.RELIGION}
          />
        );
      case OpenSettingProile.EDUCATION:
        return (
          <SettingWithSelect
            defaultValue={profile.education}
            title={'Học vấn'}
            name={'education'}
            source={EducationSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.EDUCATION}
          />
        );
      case OpenSettingProile.CHILD:
        return (
          <SettingWithInput
            defaultValue={profile.children}
            type={InputEnum.NUMBER}
            title={'Trẻ con'}
            name={'children'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.CHILDREN}
          />
        );
      case OpenSettingProile.HOBBIES:
        return <SettingHobby hobbies={profile.hobbies} />;
      default:
        return undefined;
    }
  }

  return profile.avatar ? (
    <section className={styleCss.profileFrame}>
      <HeadPage
        hTag={HTag.h2}
        title={'Tài khoản'}
        icon={<SettingIcon />}
        colorTitle={Color.clr_neutral_100}
        onIconClick={() => {
          alert('hello');
        }}
      />
      <div className={styleCss['profileFrame-simpleInfo']}>
        <Image
          className={styleCss['profileFrame-simpleInfo-image']}
          alt="avatar"
          src={profile.avatar}
          width={40}
          height={40}
        />
        <div>
          <h3 className={styleCss['profileFrame-simpleInfo-nameAndAge']}>
            {profile.name},{calculateAge(profile.birthday)}t
          </h3>
          <p className={styleCss['profileFrame-simpleInfo-reasonHere']}>
            {getPurposetitle(profile.purposeId)}
          </p>
        </div>
      </div>
      <div className={styleCss['profileFrame-album']}>
        <Row gutter={[10, 10]}>
          {profile.album.length > 0 ? (
            <Col span={16}>
              <div>
                <Image
                  className={styleCss['profileFrame-album-image']}
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
                    className={styleCss['profileFrame-album-image']}
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
                      className={styleCss['profileFrame-album-image']}
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
                className={styleCss['profileFrame-album-image']}
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
                className={styleCss['profileFrame-album-image']}
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
              <p className={styleCss['profileFrame-album-remain']}>
                +{profile.album.length - 5}
              </p>
              <div className={styleCss['profileFrame-album-image-count']}>
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
              <div className={styleCss['profileFrame-album-upload']}>
                <div>
                  <PlusIcons />
                </div>
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
      <div className={styleCss['profileFrame-settingInfo']}>
        <SettingInfo
          title={'Tại sao bạn lại ở đây'}
          content={
            getPurposetitle(profile.purposeId)
              ? getPurposetitle(profile.purposeId)
              : 'Không có'
          }
          onIconClick={openSetting}
          type={OpenSettingProile.REASON}
        />
        <SettingInfo
          title={'Giới thiệu bản thân'}
          content={profile.description}
          onIconClick={openSetting}
          type={OpenSettingProile.DESCRIPTION}
        />
      </div>
      <div className={styleCss['profileFrame-info']}>
        <SectionTitle title={'Thông tin'} marginBottom={10} />
        <div className={styleCss['profileFrame-info-infoItems']}>
          <InfoItem
            icon={<RulerIcon />}
            title={'Chiều cao'}
            value={profile.height + 'cm'}
            onIconClick={openSetting}
            type={OpenSettingProile.HEIGHT}
          />
          <InfoItem
            icon={<RingIcon />}
            title={'Hôn nhân'}
            value={ConvertMaritalStatusEnum(profile.maritalStatus)}
            onIconClick={openSetting}
            type={OpenSettingProile.MARITAL}
          />
          <InfoItem
            icon={<ChildIcon />}
            title={'Trẻ con'}
            value={profile.children === 0 ? 'Không có' : profile.children}
            onIconClick={openSetting}
            type={OpenSettingProile.CHILD}
          />
          <InfoItem
            icon={<WhiteWineIcon />}
            title={'Rựu bia'}
            value={ConvertAlcoholEnum(profile.alcohol)}
            onIconClick={openSetting}
            type={OpenSettingProile.ALCOHOL}
          />
          <InfoItem
            icon={<GenderIcon />}
            title={'Giới tính'}
            value={ConvertGenderEnum(profile.gender)}
            onIconClick={openSetting}
            type={OpenSettingProile.GENDER}
          />
          <InfoItem
            icon={<ApplauseIcon />}
            title={'Tôn giáo'}
            value={ConvertReligionEnum(profile.religion)}
            onIconClick={openSetting}
            type={OpenSettingProile.RELIGION}
          />
          <InfoItem
            icon={<GraduationIcon />}
            title={'Học vấn'}
            value={ConvertEducationEnum(profile.education)}
            onIconClick={openSetting}
            type={OpenSettingProile.EDUCATION}
          />
        </div>
      </div>
      <div className={styleCss['profileFrame-hobby']}>
        <SectionTitle
          title={'Sở thích'}
          editTitle={'Chỉnh sửa'}
          marginBottom={10}
          settingType={OpenSettingProile.HOBBIES}
          onEditClick={openSetting}
        />
        <div className={styleCss['profileFrame-hobby-hobbyItems']}>
          {profile.hobbies.map((item, index) => (
            <ItemHobby
              key={item.id}
              title={item.name}
              color={pickColor(index)}
            />
          ))}
        </div>
      </div>
      <Card height={511} ref={cardRef}>
        {SwitchCase(settingItem)}
      </Card>
      <div
        className={styleCss.profileFrame__overlay}
        hidden
        onClick={onOverlayClick}
        ref={overlayRef}
      ></div>
    </section>
  ) : (
    <Loading />
  );
};
