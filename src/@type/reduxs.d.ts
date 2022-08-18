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
