import axios, { AxiosError, AxiosInstance } from "axios";

export default class AppApi {
  protected static tokenKey: string = "pet-app-token";
  protected static BASE_URL: string = `http${
    import.meta.env.VITE_API_BASE_URL
  }`;
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

    if (mode === "development ") console.log(err);
    if (err instanceof AxiosError)
      return {
        error: err.response ? err.response.data.message : err.message,
      };
    else return { error: "unknown error" };
  }

  protected static catchError(target: any, propertyName: any, descriptor: any) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        return await method.apply(target, args);
      } catch (error) {
        return this.handleError(error);
      }
    };
  }
}
