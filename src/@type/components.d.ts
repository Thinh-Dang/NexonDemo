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

// Component IMap
interface IMap {
  lat: number;
  lng: number;
}
// Component IMarker
interface IMarkers {
  coord: IMap;
  icon: string;
}
// Component IListMarkers
interface IListMarkers {
  listNearUser: IMap[];
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
