import axios, { AxiosError, AxiosInstance } from "axios";

export default class AppApi {
  static tokenKey: string = "pet-app-token";
  static BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  static instance: AxiosInstance;

  protected static getAxiosInstance() {
    const token = this.getToken();
    return axios.create({
      baseURL: this.BASE_URL,
      timeout: 1000,
      headers: { authorization: `Bearer ${token}` },
    });
  }

  protected static handleError(err: unknown) {
    if (err instanceof AxiosError)
      return { error: err.response ? err.response.data.message : err.message };
    else return { error: "unknown error" };
  }

  protected static getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  protected static setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.instance = this.getAxiosInstance();
  }

  protected static removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
