import { AxiosError } from 'axios';
import { ResponseErrorType } from './type';

export const setFormData = (formData: { [key: string]: any }) => {
  const data = Object.keys(formData).reduce((prev, key) => {
    return {
      ...prev,
      [key]: { value: formData[key] },
    };
  }, {});

  return { variables: data, withVariablesInReturn: true };
};

export const dataFormat = (
  type: 'number' | 'string' | 'boolean' | undefined,
  val: any
) => {
  switch (type) {
    case 'number':
      return +val;
    case 'boolean':
      return !!val;
    case 'string':
      return (val as string).toString();
    default:
      return undefined;
  }
};

export const errorMessage = (error: unknown, message: string) => {
  const axiosError = error as AxiosError<ResponseErrorType, any>;
  const errorMessage = axiosError.response?.data?.message || message;

  return errorMessage;
};
