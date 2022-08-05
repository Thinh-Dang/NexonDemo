export interface ResponseDto<T> {
  code: number;
  message: string;
  data?: T | T[];
  error: string;
}
