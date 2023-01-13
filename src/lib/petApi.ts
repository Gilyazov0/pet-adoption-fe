import Pet from "../Types/Pet";
import AppApi from "./AppApi";
import ApiResponse from "../Types/ApiResponse";

export default class PetApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}pet/`;
  protected static instance = this.getAxiosInstance();

  @AppApi.catchError
  public static async getPetById(id: string): ApiResponse<Pet> {
    const res = await this.instance.get(`id/`, { params: { id } });
    return { data: res.data };
  }

  @AppApi.catchError
  public static async search(params: Object): ApiResponse<Pet[]> {
    const res = await this.instance.get(`search/`, { params });
    return { data: res.data };
  }

  @AppApi.catchError
  public static async updatePet(
    data: Pet,
    picture: File | undefined
  ): ApiResponse<Pet> {
    const response = await this.instance.post<Pet>(
      `updatePet/`,
      { data: { ...data }, picture },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      }
    );
    return { data: response.data };
  }

  @AppApi.catchError
  public static async addPet(
    data: Pet,
    picture: File | undefined
  ): ApiResponse<Pet> {
    const response = await this.instance.post<Pet>(
      `addPet/`,
      { data: { ...data }, picture },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      }
    );
    return { data: response.data };
  }
}
