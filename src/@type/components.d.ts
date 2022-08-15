// Component Layout
interface ILayout {
  header?: JSX.Element;
  children: JSX.Element;
  footer?: JSX.Element;
  isHeader?: boolean;
  isFooter?: boolean;
  title: string;
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
  img: string;
  name: string;
}

// Component ItemMessageChat
interface IItemMessageChat {
  avatar: string;
  name: string;
  message: string;
  time: string;
}
