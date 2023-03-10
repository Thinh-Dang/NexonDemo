import { IResponse } from '@/@type/responses';
import { IUpdateUserProfile } from '@/@type/services';
import {
  Color,
  HTag,
  InputEnum,
  OpenSettingProfile,
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
  SimpleProfileInfo,
  UserAlbum,
} from '@/components';
import {
  ApplauseIcon,
  ChildIcon,
  GenderIcon,
  GraduationIcon,
  LogOutIcon,
  RingIcon,
  RulerIcon,
  SettingIcon,
  WhiteWineIcon,
} from '@/components/icon';
import { Loading } from '@/components';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { updateUserProfile } from '@/redux/slice/userProfileSlice';
import {
  ConvertAlcoholEnum,
  ConvertEducationEnum,
  ConvertGenderEnum,
  ConvertMaritalStatusEnum,
  ConvertReligionEnum,
  getPurposetitle,
  pickColor,
} from '@/utils';
import { message } from 'antd';
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import styleCss from './Profile.module.scss';
import { resetLogin } from '@/redux/slice/userSlice';
import { signOut } from 'next-auth/react';
import Spinning from '@/components/Spinning/Spinning';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state: RootState) => state.userProfileSlice);
  const purposes = useAppSelector((state: RootState) => state.purposeSlice);

  const [settingItem, setSettingItem] = useState('');

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

  const openSetting = useCallback((type: OpenSettingProfile) => {
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
      case OpenSettingProfile.REASON:
        return (
          <ReasonPopUp
            purposes={purposes}
            userPurposeId={profile.purposeId}
            onChange={changeReason}
          />
        );
      case OpenSettingProfile.DESCRIPTION:
        return (
          <SettingWithInput
            defaultValue={profile.description}
            type={InputEnum.TEXT}
            title={'Gi???i thi???u b???n th??n'}
            isTextArea={true}
            name={'description'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.DESCRIPTION}
          />
        );
      case OpenSettingProfile.HEIGHT:
        return (
          <SettingWithInput
            defaultValue={profile.height}
            type={InputEnum.NUMBER}
            title={'Chi???u cao'}
            numMax={200}
            name={'height'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.HEIGHT}
          />
        );
      case OpenSettingProfile.MARITAL:
        return (
          <SettingWithSelect
            defaultValue={profile.maritalStatus}
            title={'T??nh tr???ng h??n nh??n'}
            source={MaritalSource()}
            name={'maritalStatus'}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.MARITAL_STATUS}
          />
        );
      case OpenSettingProfile.ALCOHOL:
        return (
          <SettingWithSelect
            defaultValue={profile.alcohol}
            title={'R?????u bia'}
            name={'alcohol'}
            source={AlcoholSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.ALCOHOL}
          />
        );
      case OpenSettingProfile.GENDER:
        return (
          <SettingWithSelect
            defaultValue={profile.gender}
            title={'Gi???i t??nh'}
            name={'gender'}
            source={GenderSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.GENDER}
          />
        );
      case OpenSettingProfile.RELIGION:
        return (
          <SettingWithSelect
            defaultValue={profile.religion}
            title={'T??n gi??o'}
            name={'religion'}
            source={ReligionSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.RELIGION}
          />
        );
      case OpenSettingProfile.EDUCATION:
        return (
          <SettingWithSelect
            defaultValue={profile.education}
            title={'H???c v???n'}
            name={'education'}
            source={EducationSource()}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.EDUCATION}
          />
        );
      case OpenSettingProfile.CHILD:
        return (
          <SettingWithInput
            defaultValue={profile.children}
            type={InputEnum.NUMBER}
            title={'Tr??? con'}
            name={'children'}
            numMax={5}
            onClosePopUp={onOverlayClick}
            settingType={UpdateUserProfileEnum.CHILDREN}
          />
        );
      case OpenSettingProfile.HOBBIES:
        return <SettingHobby hobbies={profile.hobbies} />;
      default:
        return undefined;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    signOut({ callbackUrl: '/' });
    dispatch(resetLogin());
  };

  return profile && purposes ? (
    <section className={styleCss.profileFrame}>
      <HeadPage
        hTag={HTag.h2}
        title={'T??i kho???n'}
        icon={<LogOutIcon />}
        colorTitle={Color.clr_neutral_100}
        onIconClick={handleLogout}
      />

      <SimpleProfileInfo
        name={profile.name}
        birthday={profile.birthday}
        purposeTite={getPurposetitle(profile.purposeId, purposes)}
        avatar={profile.avatar}
      />

      <UserAlbum
        album={
          // profile.album ?
          // profile.album :
          [
            {
              id: 'https://i.pinimg.com/236x/dc/92/1e/dc921ec2e07f9437dc51f2a10694578d.jpg',
              url: 'https://i.pinimg.com/236x/dc/92/1e/dc921ec2e07f9437dc51f2a10694578d.jpg',
              isFavorite: true,
            },
            {
              id: 'https://i.pinimg.com/236x/94/29/76/942976f5a1d91cbf8e51ab970044b1ae.jpg',
              url: 'https://i.pinimg.com/236x/94/29/76/942976f5a1d91cbf8e51ab970044b1ae.jpg',
              isFavorite: false,
            },
            {
              id: 'https://i.pinimg.com/236x/0f/1c/15/0f1c15c001c3afc9b338e4fe50bb9acf.jpg',
              url: 'https://i.pinimg.com/236x/0f/1c/15/0f1c15c001c3afc9b338e4fe50bb9acf.jpg',
              isFavorite: false,
            },
            {
              id: 'https://i.pinimg.com/236x/08/94/bc/0894bcf8403d83d0ee3eb6292aba11b7.jpg',
              url: 'https://i.pinimg.com/236x/08/94/bc/0894bcf8403d83d0ee3eb6292aba11b7.jpg',
              isFavorite: true,
            },
            {
              id: 'https://i.pinimg.com/236x/d3/7c/33/d37c33b2921a5df2fc85040e32b28f6c.jpg',
              url: 'https://i.pinimg.com/236x/d3/7c/33/d37c33b2921a5df2fc85040e32b28f6c.jpg',
              isFavorite: true,
            },
          ]
        }
      />
      <div className={styleCss['profileFrame-settingInfo']}>
        <SettingInfo
          title={'T???i sao b???n l???i ??? ????y'}
          content={
            getPurposetitle(profile.purposeId, purposes)
              ? getPurposetitle(profile.purposeId, purposes)
              : 'Kh??ng c??'
          }
          onIconClick={openSetting}
          type={OpenSettingProfile.REASON}
        />
        <SettingInfo
          title={'Gi???i thi???u b???n th??n'}
          content={profile.description}
          onIconClick={openSetting}
          type={OpenSettingProfile.DESCRIPTION}
        />
      </div>
      <div className={styleCss['profileFrame-info']}>
        <SectionTitle title={'Th??ng tin'} marginBottom={10} />
        <div className={styleCss['profileFrame-info-infoItems']}>
          <InfoItem
            icon={<RulerIcon />}
            title={'Chi???u cao'}
            value={profile.height + 'cm'}
            onIconClick={openSetting}
            type={OpenSettingProfile.HEIGHT}
          />
          <InfoItem
            icon={<RingIcon />}
            title={'H??n nh??n'}
            value={ConvertMaritalStatusEnum(profile.maritalStatus)}
            onIconClick={openSetting}
            type={OpenSettingProfile.MARITAL}
          />
          <InfoItem
            icon={<ChildIcon />}
            title={'Tr??? con'}
            value={profile.children === 0 ? 'Kh??ng c??' : profile.children}
            onIconClick={openSetting}
            type={OpenSettingProfile.CHILD}
          />
          <InfoItem
            icon={<WhiteWineIcon />}
            title={'R?????u bia'}
            value={ConvertAlcoholEnum(profile.alcohol)}
            onIconClick={openSetting}
            type={OpenSettingProfile.ALCOHOL}
          />
          <InfoItem
            icon={<GenderIcon />}
            title={'Gi???i t??nh'}
            value={ConvertGenderEnum(profile.gender)}
            onIconClick={openSetting}
            type={OpenSettingProfile.GENDER}
          />
          <InfoItem
            icon={<ApplauseIcon />}
            title={'T??n gi??o'}
            value={ConvertReligionEnum(profile.religion)}
            onIconClick={openSetting}
            type={OpenSettingProfile.RELIGION}
          />
          <InfoItem
            icon={<GraduationIcon />}
            title={'H???c v???n'}
            value={ConvertEducationEnum(profile.education)}
            onIconClick={openSetting}
            type={OpenSettingProfile.EDUCATION}
          />
        </div>
      </div>
      <div className={styleCss['profileFrame-hobby']}>
        <SectionTitle
          title={'S??? th??ch'}
          editTitle={'Ch???nh s???a'}
          marginBottom={10}
          settingType={OpenSettingProfile.HOBBIES}
          onEditClick={openSetting}
        />
        <div className={styleCss['profileFrame-hobby-hobbyItems']}>
          {profile.hobbies?.map((item, index) => (
            <ItemHobby
              key={item.id}
              title={item.name}
              color={pickColor(index)}
            />
          ))}
        </div>
      </div>
      <Card height={'511px'} ref={cardRef}>
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
    <div
      className="spinning-container"
      style={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinning />
    </div>
  );
};
