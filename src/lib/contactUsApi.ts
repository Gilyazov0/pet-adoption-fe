import ApiResponse from "../Types/ApiResponse";
import AppApi from "./AppApi";
import Issue from "../Types/Issue";

export default class ContactUsApi extends AppApi {
  protected static BASE_URL = `${super.BASE_URL}contactUs/`;
  protected static instance = this.getAxiosInstance();

  @AppApi.catchError
  public static async addIssue(
    text: string,
    title: string
  ): ApiResponse<{ ok: true }> {
    const data = { text, title };

    const res = await this.instance.post(`/`, { data });
    return { data: res.data };
  }

  @AppApi.catchError
  public static async getAllIssues(): ApiResponse<Issue[]> {
    const res = await this.instance.get(`/`);
    return { data: res.data };
  }

  @AppApi.catchError
  public static async delIssue(issueId: string): ApiResponse<boolean> {
    const params = { issueId };

    const res = await this.instance.delete(`/`, { params });
    return { data: res.data };
  }
  @AppApi.catchError
  public static async addComment(
    text: string,
    issueId: string
  ): ApiResponse<{ data: Issue }> {
    const data = { text, issueId };

    const res = await this.instance.post(`/addComment`, { data });

    return { data: res.data };
  }
}
