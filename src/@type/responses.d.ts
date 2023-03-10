export interface IResponse<T> {
  status: boolean;
  error_code?: error | string | number;
  data: T | T[] | string | Array | object;
  message?: string | null;
}
