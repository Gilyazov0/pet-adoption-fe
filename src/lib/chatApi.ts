import ApiResponse from "../Types/ApiResponse";
import ChatMsg from "../Types/ChatMsg";
import AppApi from "./AppApi";

export default class ChatApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}chat/`;
  protected static instance = this.getAxiosInstance();

  @AppApi.catchError
  public static async getAllChats(): ApiResponse<{ [key: number]: ChatMsg[] }> {
    const res = await this.instance.get(`all/`);
    return { data: res.data };
  }

  @AppApi.catchError
  public static async getChatById(chatId: number): ApiResponse<ChatMsg[]> {
    const data = { chatId };
    const res = await this.instance.post(`byId/`, { data });
    return { data: res.data };
  }

  @AppApi.catchError
  public static async delChat(chatId: number): ApiResponse<boolean> {
    const data = { chatId };
    const res = await this.instance.post(`del/`, { data });
    return { data: res.data };
  }
}
