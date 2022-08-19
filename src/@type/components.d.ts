import {
  Color,
  HTag,
  InputEnum,
  OpenSettingProfile,
  UpdateUserProfileEnum,
} from '@/common/enums/enum';
import { IUserHobbies } from './params';
import { ICreateHobby, IUpdateUserProfile } from './services';

// Component Header
interface IHeader {
  isLogo: boolean;
}

// Component Layout
interface ILayout {
  children: JSX.Element;
  isHeader?: boolean;
  isFooter?: boolean;
  title: string;
  isLogo?: boolean;
}

// Component Header Page
interface IHeaderPage {
  hTag: HTag;
  title: string;
  icon?: JSX.Element;
  colorTitle: string;
  onIconClick?: () => void;
}

// Component Setting Info
interface ISettingInfor {
  title: string;
  content: string | undefined;
  onIconClick: (type: OpenSettingProfile) => void;
  type: OpenSettingProfile;
}

// Component Info Item
interface IInfoItem {
  icon: JSX.Element;
  title: string;
  value: string | number;
  onIconClick: (type: OpenSettingProfile) => void;
  type: OpenSettingProfile;
}

// Component Section Title
interface ISectionTitle {
  title: string;
  editTitle?: string;
  marginBottom?: number;
  settingType?: OpenSettingProfile;
  onEditClick?: (type: OpenSettingProfile) => void;
}

// Component Item Hobby
interface IItemHobby {
  title: string;
  color: Color;
  value?: string;
  icon?: string;
  onIconClick?: (value: string) => void;
}

// Component Card
interface ICard {
  height: string;
  children?: JSX.Element;
}

// Compoenent Item Reason
interface IItemReason {
  icon: string;
  title: string;
  subTitle: string;
  checked?: boolean;
  value: string;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

// Component Setting Description
interface ISettingDescription {
  defaultValue: string;
  setDescription: () => void;
}

// Component Input Container
interface IInputContainer {
  children: JSX.Element;
  label: string;
}

// Component Reason Popup
interface IReasonPopUp {
  purposes: IPurpose[];
  userPurposeId: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

// Component InfoUserChat
interface IInfoUserChat {
  avatar: string;
  title: string;
  content: string;
}

// Component ItemContentChat
interface IItemContentChat {
  time?: string;
  content: string;
  type: typeItemContentChat.FRIEND | typeItemContentChat.YOU;
}

// Component ItemChatSlider
interface IItemChatSlider {
  id: string;
  avatar: string;
  name: string;
}

// Component ItemMessageChat
interface IItemMessageChat {
  conversationId: string;
  friendId: string;
  name: string;
  avatar: string;
  content: string;
  createAt: Date;
}

// Component Content
interface IContent {
  contentTitle: string;
  contentText: string;
  classContent: string;
}

// Component Button
interface IButton {
  type: any;
  id?: string;
  name?: string;
  style?: CSSProperties;
  disabled?: boolean;
  content: string | ReactNode;
  btnClass?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isHaveIcon?: boolean;
}

// Component My Input
interface IMyInput {
  type: InputEnum;
  initValue: string | number;
  isTextArea?: boolean;
}

// Component My Button
interface IMyButton {
  title: string;
  type: string;
}

// Component Setting Height
interface ISettingWithInput {
  defaultValue: number | string;
  type: InputEnum;
  title: string;
  name: string;
  isTextArea?: boolean;
  onSubmit: (value: IUpdateUserProfile) => void;
  settingType: UpdateUserProfileEnum;
}

// Component Setting With Select
interface ISettingWithSelect {
  defaultValue: string | number;
  title: string;
  name: string;
  source: ISettingSource[];
  settingType: UpdateUserProfileEnum;
  onSubmit: (value: IUpdateUserProfile) => void;
}

// Component My Select
interface IMySelect {
  defaultValue?: string | number;
  source: ISettingSource[];
}

interface ISettingHobby {
  hobbies: IUserHobbies[];
  onCreate: (value: ICreateHobby) => void;
  onDelele: (value: string) => void;
}
