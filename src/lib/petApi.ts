import Pet from "../Types/Pet";
import AppApi from "./abstractApi";
import ApiResponse from "../Types/ApiResponse";

export default class PetApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}pet/`;
  protected static instance = this.getAxiosInstance();

  public static async getPetById(id: string): ApiResponse<Pet> {
    try {
      const res = await this.instance.get(`id/`, { params: { id } });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async search(params: Object): ApiResponse<Pet[]> {
    try {
      const res = await this.instance.get(`search/`, { params });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async updatePet(
    data: Pet,
    picture: File | undefined
  ): ApiResponse<Pet> {
    try {
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
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async addPet(
    data: Pet,
    picture: File | undefined
  ): ApiResponse<Pet> {
    try {
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
    } catch (err) {
      return this.handleError(err);
    }
  }
}
