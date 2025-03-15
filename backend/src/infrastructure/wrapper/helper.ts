import { BaseResponse } from "./type";

export function success<T>(statusCode: number, data: T): BaseResponse<T> {
  return {
    success: true,
    message: "success",
    data,
    statusCode,
  };
}
// Function for error responses
export function error<T>(
  statusCode: number,
  message: string,
  data: T | null = null,
): BaseResponse<T | null> {
  return {
    success: false,
    message,
    data,
    statusCode,
  };
}
