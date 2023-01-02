import User from "../Types/User";
import axios, { AxiosInstance } from "axios";
import AppApi from "./abstractApi";
import ApiResponse from "../Types/ApiResponse";

export default class UserApi extends AppApi {
  static BASE_URL = `${super.BASE_URL}user/`;
  static instance: AxiosInstance = this.getAxiosInstance();

  public static async updateUser(
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    bio: string,
    password?: string
  ): ApiResponse<User> {
    try {
      const data = { email, firstName, lastName, phone, bio, password };
      const response = await axios.patch<User>("", data);
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async login(
    email: string,
    password: string
  ): ApiResponse<User> {
    try {
      const data = { email, password };
      const response = await this.instance.post<{ user: User; token: string }>(
        `login`,
        data
      );

      this.setToken(response.data.token);

      return { data: response.data.user };
    } catch (err) {
      console.log(err);
      return this.handleError(err);
    }
  }

  public static logout() {
    this.removeToken();
  }

  public static async createUser(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): ApiResponse<User> {
    const data = { firstName, lastName, email, phone, password };
    try {
      const response = await this.instance.post<User>("", data);
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async changeSave(
    userId: number,
    petId: number
  ): ApiResponse<User> {
    return this.changeData(userId, petId, "changeSave");
  }

  public static async changeAdopt(
    userId: number,
    petId: number
  ): ApiResponse<User> {
    return this.changeData(userId, petId, "changeAdopt");
  }

  public static async changeFoster(
    userId: number,
    petId: number
  ): ApiResponse<User> {
    return this.changeData(userId, petId, "changeFoster");
  }

  private static async changeData(
    userId: number,
    petId: number,
    url: string
  ): ApiResponse<User> {
    try {
      const data = { userId, petId };
      const response = await this.instance.post<User>(url, data);
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }
}
