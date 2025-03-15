export interface BaseResponse<T> {
  statusCode?: number; // Optional, internal use only
  success: boolean;
  message: string;
  data: T;
}


