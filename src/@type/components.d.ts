import { Color, HTag } from '@/common/enums/enum';
import { string } from 'yup';

// Component Layout
interface ILayout {
  header?: JSX.Element;
  children: JSX.Element;
  footer?: JSX.Element;
  isHeader?: boolean;
  isFooter?: boolean;
  title: string;
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
  content: string;
  onIconClick?: () => void;
}

// Component Info Item
interface IInfoItem {
  icon: JSX.Element;
  title: string;
  value: string | number;
}

// Component Section Title
interface ISectionTitle {
  title: string;
  editTitle?: string;
  marginBottom?: number;
  onEditClick?: () => void;
}

// Component Item Hobby
interface IItemHobby {
  title: string;
  color: Color;
}

// Component Card
interface ICard {
  height: number;
  children?: JSX.Element;
}

// Compoenent Item Reason
interface IItemReason {
  icon: string;
  title: string;
  subTitle: string;
  checked?: boolean;
  value: string;
  onChange?: () => void;
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
}
