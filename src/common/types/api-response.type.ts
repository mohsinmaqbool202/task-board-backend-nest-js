export interface ApiResponse<T = any> {
  success: boolean;
  message: string | string[] | null;
  data: T | null;
}