import axiosApiCall from '@/utils/api';
import { Method } from '@/common/enums/enum';

const chatApi = {
  getListFriends: async (userId: string) => {
    const url = `user-friends/${userId}`;
    return await axiosApiCall(url, Method.get);
  },
  getFriendByUserIdAndFriendId: async (userId: string, friendId: string) => {
    const url = `user-friends?userId=${userId}&friendId=${friendId}`;
    return await axiosApiCall(url, Method.get);
  },
  getConversationsByUserIdAndFriendId: async (
    userId: string,
    friendId: string,
  ) => {
    const url = `chat/conversations?userId=${userId}&friendId=${friendId}`;
    return await axiosApiCall(url, Method.get);
  },
  getConversationsByUserId: async (userId: string) => {
    const url = `chat/conversations/${userId}`;
    return await axiosApiCall(url, Method.get);
  },
  getFriendByConversationId: async (conversationId: string) => {
    const url = `chat/friend/${conversationId}`;
    return await axiosApiCall(url, Method.get);
  },
  getMessageByConversationId: async (conversationId: string) => {
    const url = `chat/message/${conversationId}`;
    return await axiosApiCall(url, Method.get);
  },
};

export default chatApi;
