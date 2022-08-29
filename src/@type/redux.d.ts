interface IAction {
  code: number;
  message: string;
  data?: undefined;
}

// Slice User Redux
interface IInitialStateUser {
  isLogin: boolean;
  id: string;
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
  isValidOtp: boolean;
  isValidOtpWhenEmailVerify: boolean;
  isLoading: boolean;
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

// Slice Notification Redux

interface INotification {
  id: string;
  senderId: string;
  message: string;
  time: Date;
}

interface IInitialStateNotification {
  data: INotification[];
  unreadNotice: number;
  isNotification: boolean;
  content: string;
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
  friendProfile: IFriendProfile | null;
  zoomLevel: number;
}
interface IGetFriendNearUser {
  id: string;
  latitude: number;
  longtitude: number;
  name: string;
  birthday: Date;
  avatar: string;
  distance: number;
  unit: string;
}

interface INameAndEmail {
  name: string;
  email: string;
}

interface IInitialStateUserLikeStack {
  matching: IMatchingFriend[];
}
interface IFriendProfile extends IUserProfile {
  distance: number;
  unit: string;
}
