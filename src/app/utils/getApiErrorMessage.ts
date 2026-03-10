import { isAxiosError } from 'axios';

interface ApiErrorPayload {
  message?: string | string[];
}

export function getApiErrorMessage(error: unknown) {
  if (isAxiosError<ApiErrorPayload>(error)) {
    const apiMessage = error.response?.data?.message;

    if (Array.isArray(apiMessage)) {
      return apiMessage[0];
    }

    if (typeof apiMessage === 'string' && apiMessage.trim()) {
      return apiMessage;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return undefined;
}
