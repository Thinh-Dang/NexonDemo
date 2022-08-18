interface IAction {
  code: number;
  message: string;
  data?: undefined;
}

// Slice User Redux
interface IInitialStateUser {
  isStatusApi: boolean;
  isLogin: boolean;
  isSocial: boolean;
  phone: string;
  isGetPhone: boolean;
  isVerifyOtp: boolean;
  inforUser: {
    name: string;
    email: string;
    birthday: string;
    gender: GenderEnum;
  };
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
