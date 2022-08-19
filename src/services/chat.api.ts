import axiosApiCall from '@/utils/api';
import { Method } from '@/common/enums/enum';

const chatApi = {
  getListFriends: async () => {
    const url = `secure/user-friends`;
    return await axiosApiCall(url, Method.get);
  },
  getFriendByUserIdAndFriendId: async (friendId: string) => {
    const url = `secure/user-friends/${friendId}`;
    return await axiosApiCall(url, Method.get);
  },
  getConversationsByUserIdAndFriendId: async (friendId: string) => {
    const url = `secure/chat/conversations/${friendId}`;
    return await axiosApiCall(url, Method.get);
  },
  getConversationsByUserId: async () => {
    const url = `secure/chat/conversations`;
    return await axiosApiCall(url, Method.get);
  },
  getMessageByConversationId: async (conversationId: string) => {
    const url = `secure/chat/message/${conversationId}`;
    return await axiosApiCall(url, Method.get);
  },
};

export default chatApi;
