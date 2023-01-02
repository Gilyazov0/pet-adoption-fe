import User from "../Types/User";
import axios, { AxiosError, AxiosInstance } from "axios";

type UserResponseType = Promise<
  | {
      user: User;
      error?: undefined;
    }
  | {
      error: string;
      user?: undefined;
    }
>;
export default class UserApi {
  static instance: AxiosInstance = this.getAxiosInstance();
  static tokenKey: string = "pet-app-token";
  static BASE_URL = "http://localhost:8080/user/";

  public static async updateUser(
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    bio: string,
    password?: string
  ): UserResponseType {
    try {
      const data = { email, firstName, lastName, phone, bio, password };
      const response = await axios.patch<User>(this.BASE_URL, data);
      return { user: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async login(email: string, password: string): UserResponseType {
    try {
      const data = { email, password };
      const response = await this.instance.post<{ user: User; token: string }>(
        `${this.BASE_URL}/login`,
        data
      );

      this.setToken(response.data.token);

      return { user: response.data.user };
    } catch (err) {
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
  ): UserResponseType {
    const data = { firstName, lastName, email, phone, password };
    try {
      const response = await this.instance.post<User>(this.BASE_URL, data);
      return { user: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async changeSave(
    userId: number,
    petId: number
  ): UserResponseType {
    return this.changeData(userId, petId, "changeSave");
  }

  public static async changeAdopt(
    userId: number,
    petId: number
  ): UserResponseType {
    return this.changeData(userId, petId, "changeAdopt");
  }

  public static async changeFoster(
    userId: number,
    petId: number
  ): UserResponseType {
    return this.changeData(userId, petId, "changeFoster");
  }

  private static getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  private static setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.instance = this.getAxiosInstance();
  }

  private static removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  private static async changeData(
    userId: number,
    petId: number,
    url: string
  ): UserResponseType {
    try {
      const data = { userId, petId };
      const response = await this.instance.post<User>(
        `${this.BASE_URL}${url}`,
        data
      );
      return { user: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  private static handleError(err: unknown) {
    if (err instanceof AxiosError)
      return { error: err.response ? err.response.data.message : err.message };
    else return { error: "unknown error" };
  }

  private static getAxiosInstance() {
    const token = this.getToken();
    return axios.create({
      baseURL: "https://some-domain.com/api/",
      timeout: 1000,
      headers: { authorization: `Bearer ${token}` },
    });
  }
}
