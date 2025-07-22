import { ApiResponse } from '../types/api-response.type';

export function jsonApiResponse<T>(
  success: boolean,
  message: string | string[] | null,
  data: T | null = null,
): ApiResponse<T> {
  return {
    success,
    message,
    data,
  };
}