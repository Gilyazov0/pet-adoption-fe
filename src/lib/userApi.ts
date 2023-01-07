import User from "../Types/User";
import { AxiosInstance } from "axios";
import AppApi from "./abstractApi";
import ApiResponse from "../Types/ApiResponse";

export default class UserApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}user/`;
  protected static instance: AxiosInstance = this.getAxiosInstance();

  public static async updateUser(
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    bio: string,
    password?: string
  ): ApiResponse<User> {
    try {
      const data = {
        data: { email, firstName, lastName, phone, bio, password },
      };
      const response = await this.instance.patch<User>("", data);
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async getAllUsers(): ApiResponse<User[]> {
    try {
      const response = await this.instance.get<User[]>("/allUsers");
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async getUserById(id: number): ApiResponse<User> {
    try {
      const response = await this.instance.get<User>("/", { params: { id } });
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
      const data = { data: { email, password } };
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
    const data = { data: { firstName, lastName, email, phone, password } };
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
    return this.changeData(petId, "changeSave");
  }

  public static async changeAdopt(
    userId: number,
    petId: number
  ): ApiResponse<User> {
    return this.changeData(petId, "changeAdopt");
  }

  public static async changeFoster(
    userId: number,
    petId: number
  ): ApiResponse<User> {
    return this.changeData(petId, "changeFoster");
  }

  private static async changeData(
    petId: number,
    url: string
  ): ApiResponse<User> {
    try {
      const data = { data: { petId } };
      const response = await this.instance.post<User>(url, data);
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }
}
