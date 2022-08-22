// Container Chat Home
interface IChatHome {
  chatSlider: IItemChatSlider[];
  conversationSlider: IItemMessageChat[];
}

// Container Chat Content
interface IUserFriend {
  userId: string;
  name: string;
  avatar: string;
  createAt: Date;
}

interface IMessage {
  messageId: string;
  senderId: string;
  content: string;
  image?: string;
  createAt: Date;
}

interface IMessageSend {
  socketId: string;
  senderId: string;
  conversationId: string;
  content: string;
}

interface ISocketDevice {
  conversationId: string;
  socketId: string;
  userId: string;
}

interface IChatContent {
  infoFriend: IUserFriend;
  messages: IMessage[];
  contentChat: string;
  setContentChat: Dispatch<SetStateAction<string>>;
  handleClick: (e: any) => void;
  userId: string;
}

// Map Container
interface IMapLocationContainer {
  friendsNearUser: IGetFriendNearUser[];
}
