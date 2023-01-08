import axios, { AxiosError, AxiosInstance } from "axios";

export default class AppApi {
  protected static tokenKey: string = "pet-app-token";
  protected static BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  protected static instance: AxiosInstance;
  protected static token: string;

  protected static getAxiosInstance() {
    const token = this.getToken();
    console.log(token);
    return axios.create({
      withCredentials: true,
      baseURL: this.BASE_URL,
      timeout: 5000,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  protected static handleError(err: unknown) {
    if (err instanceof AxiosError)
      return { error: err.response ? err.response.data.message : err.message };
    else return { error: "unknown error" };
  }

  protected static getToken() {
    // return this.token;
    return localStorage.getItem(this.tokenKey);
  }

  protected static setToken(token?: string) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      this.token = token;
      this.instance = this.getAxiosInstance();
    }
  }

  protected static removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
