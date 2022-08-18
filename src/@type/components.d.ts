// Component Layout
interface ILayout {
  header?: JSX.Element;
  children: JSX.Element;
  footer?: JSX.Element;
  isHeader?: boolean;
  isFooter?: boolean;
  title: string;
  islogo: boolean;
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
interface IContent {
  contentTitle: string;
  contentText: string;
  classContent: string;
}
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
