import ApiResponse from "../Types/ApiResponse";
import AppApi from "./abstractApi";
import { EventMsg } from "../Types/EventMsg";
import Pet from "../Types/Pet";

export default class EventApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}event/`;
  protected static instance = this.getAxiosInstance();

  public static async getNewsfeed(
    startDate: string,
    endDate: string
  ): ApiResponse<EventMsg[]> {
    try {
      const res = await this.instance.get(`newsfeed/`, {
        params: { startDate, endDate },
      });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }
  public static async getNewPets(): ApiResponse<Pet[]> {
    try {
      const res = await this.instance.get(`newPets/`, {
        withCredentials: true,
      });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }
}
