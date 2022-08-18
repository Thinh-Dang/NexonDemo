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
  friendInfo: IGetFriendNearUser;
}
