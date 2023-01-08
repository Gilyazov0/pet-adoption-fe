import axios, { AxiosError, AxiosInstance } from "axios";

export default class AppApi {
  protected static tokenKey: string = "pet-app-token";
  protected static BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
  protected static instance: AxiosInstance;

  protected static getAxiosInstance() {
    return axios.create({
      withCredentials: true,
      baseURL: this.BASE_URL,
      timeout: 5000,
    });
  }

  protected static handleError(err: unknown) {
    const mode = import.meta.env.MODE;
    console.log(mode);

    if (mode === "development ") console.log(err);
    if (err instanceof AxiosError)
      return {
        error: err.response ? err.response.data.message : err.message,
      };
    else return { error: "unknown error" };
  }
}
