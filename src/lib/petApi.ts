import Pet from "../Types/Pet";
import AppApi from "./abstractApi";
import ApiResponse from "../Types/ApiResponse";

export default class PetApi extends AppApi {
  static BASE_URL = `${super.BASE_URL}pet/`;
  static instance = this.getAxiosInstance();

  public static async getPetById(id: string): ApiResponse<Pet> {
    try {
      const res = await this.instance.get(`id/`, { params: { id } });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async search(
    name: string,
    type: string,
    weight: string,
    height: string,
    status: string
  ): ApiResponse<Pet[]> {
    try {
      const params = { name, type, weight, height, status };

      const res = await this.instance.get(`search/`, { params });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async addPet(
    data: Omit<Pet, "id" | "picture" | "adoptionStatus">
  ): ApiResponse<Pet> {
    try {
      const response = await this.instance.post<Pet>(`addPet/`, data);
      return { data: response.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  public static async getPetsByIds(ids: string[]): ApiResponse<Pet[]> {
    try {
      const params = { ids };

      const res = await this.instance.get(`ids/`, { params });
      return { data: res.data };
    } catch (err) {
      return this.handleError(err);
    }
  }
}
