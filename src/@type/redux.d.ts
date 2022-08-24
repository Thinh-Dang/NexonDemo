interface IAction {
  code: number;
  message: string;
  data?: undefined;
}

// Slice User Redux
interface IInitialStateUser {
  isLogin: boolean;
  phone: string;
  step: number;
  inforUser: {
    name: string;
    email: string;
    birthday: string;
    gender: GenderEnum;
  };
  stateSession: any;
  isHeader: boolean;
  isEmailVerify: boolean;
}

// Slice Uer Profile Redux
interface IUserProfile {
  [key: string]: any;
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: Date;
  gender: string;
  description: string;
  children: number;
  alcohol: string;
  religion: string;
  purposeId: string;
  height: number;
  maritalStatus: string;
  education: string;
  isBlock: boolean;
  isVerify: boolean;
  album: IUserImages[];
  hobbies: IUserHobbies[];
}

// Slice Chat Redux
interface IMessage {
  id: string;
  sender_id: string;
  conversation_id: string;
  content: string;
  image: string;
}

interface IConversation {
  id: string;
  user_id: string;
  user_friend_id: string;
  socket_id: string;
  message: IMessage[];
  sending: boolean;
}

interface IInitialStateChat {
  loading: boolean;
  error: string;
  conversations: IConversation[] | undefined;
  messages: IMessage[] | undefined;
  loaded: boolean;
}

declare interface IUserNearby {
  id: string;
  name: string;
  age: number;
  location?: {
    longitude: number;
    latitude: number;
  };
  distance: number;
  imgUrl: string;
}

// map location
interface IInitialStateMapLocation {
  centerPosition: IMap;
  userPosition: IMap;
  friendsNearUser: IGetFriendNearUser[];
  friendInfo: IGetFriendNearUser | null;
  zoomLevel: number;
}
interface IGetFriendNearUser {
  id: string;
  name: string;
  birthday: Date;
  avatar: string;
  latitude: number;
  longtitude: number;
  distance: number;
  unit: string;
}

interface INameAndEmail {
  name: string;
  email: string;
}
