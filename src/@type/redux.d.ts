interface IAction {
  code: number;
  message: string;
  data?: undefined;
}

// Slice User Redux
interface IInitialStateUser {
  isVerifyOtp: boolean;
  isLogin: boolean;
  isSocial: boolean;
  name: string;
  email: string;
  phone: string;
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

// map location
interface IInitialStateMapLocation {
  centerPosition: IMap;
  userPosition: IMap;
  friendsNearUser: IGetFriendNearUser[];
  friendInfo: IGetFriendNearUser;
  zoomLevel: number;
}
interface IGetFriendNearUser {
  friendId: string;
  friendName: string;
  friendBirthday: string;
  friendAvatar: string;
  latitude: number;
  longtitude: number;
  distance: number;
}
