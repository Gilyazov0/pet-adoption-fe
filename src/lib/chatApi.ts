import ApiResponse from "../Types/ApiResponse";
import ChatMsg from "../Types/ChatMsg";
import AppApi from "./abstractApi";

export default class ChatApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}chat/`;
  protected static instance = this.getAxiosInstance();

  public static async getAllChats(): ApiResponse<{ [key: number]: ChatMsg[] }> {
    try {
      const res = await this.instance.get(`all/`);
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async getChatById(chatId: number): ApiResponse<ChatMsg[]> {
    try {
      const data = { chatId };
      const res = await this.instance.post(`byId/`, { data });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }
}
