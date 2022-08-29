import {
  Color,
  HTag,
  InputEnum,
  OpenSettingProfile,
  UpdateUserProfileEnum,
} from '@/common/enums/enum';
import { number, string } from 'yup';
import { ISettingSource, IUserHobbies, IUserImages } from './params';
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

// Component My Select
interface IMySelect {
  title: string;
  source: ISettingSource[];
  defaultValue: string | number;
  value?: string;
  onChange?: any;
}

// Component Setting With Select
interface ISettingWithSelect {
  defaultValue: string | number;
  title: string;
  name: string;
  source: ISettingSource[];
  settingType: UpdateUserProfileEnum;
  onClosePopUp: () => void;
}

interface ISettingWithInput {
  defaultValue: number | string;
  numMax?: number;
  type: InputEnum;
  title: string;
  name: string;
  isTextArea?: boolean;
  onClosePopUp: () => void;
  settingType: UpdateUserProfileEnum;
}

interface ISettingHobby {
  hobbies: IUserHobbies[];
}

// Component Card
interface ICard {
  height: string;
  children?: JSX.Element | null | string;
  hasCloseBtn?: boolean;
  onCloseCard?: () => void;
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
  id: string;
  time?: string;
  content: string;
  image?: string;
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
// Component IMap
interface IMap {
  lat: number;
  lng: number;
}
// Component IMarker
interface IMarkers {
  coord: IMap;
  icon: unknow;
  friendInfo?: IGetFriendNearUser;
}
// Component IListMarkers
interface IListMarkers {
  friendsNearUser: IGetFriendNearUser[];
}
// Component ITags
interface ITags {
  icon: string;
  title: string;
  bg_color?: string;
  color: string;
  name: string;
  width: string;
  height: string;
}

// Component FriendInfo
interface IFriend {
  friendInfo: IGetFriendNearUser | null;
  handleInfoClick: (id: string) => void;
}
interface IMyInput {
  isInput?: boolean;
  txtLabel?: string;
  txtPlaceholder?: string;
  isDatePicker?: boolean;
  isSelection?: boolean;
  isTextArea?: boolean;
  name?: string;
  type?: string;
  defaultValue?: any;
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  handleChangeDatePicker?: (a: Moment | undefined, b: string) => void;
  value?: string | null | undefined;
  onSubmitOtp?: any;
  disabled?: any;
  errorOTP?: string;
}

interface IUserAlbum {
  album: IUserImages[];
}

// Component Image Card
interface IImageCard {
  id: string;
  url: string;
  onFavorite?: (id: string) => void;
  isFavorite: boolean;
  isAvailableFavorite?: boolean;
}

// Component Simple Profile Info
interface ISimpleProfileInfo {
  name: string;
  birthday: Date;
  purposeTite: string | undefined;
  avatar: string;
}

// Component Item Notify
interface IItemNotify {
  notification: {
    id: string;
    message: string;
    createdAt: string;
    type: string;
    isRead: boolean;
  };
  openMatchPage: () => void;
}

// Component Item Item Notification
interface IItemNotification {
  content: string;
  time?: number;
}
