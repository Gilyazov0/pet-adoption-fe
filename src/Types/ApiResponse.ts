type ApiResponse<T> = Promise<
  | {
      data: T;
      error?: undefined;
    }
  | {
      error: string;
      data?: undefined;
    }
>;

export default ApiResponse;
