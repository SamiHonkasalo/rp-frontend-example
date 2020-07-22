import { useState, useCallback, useEffect, useRef } from 'react';

interface RequestParams {
  url: string;
  method?: string;
  body?: BodyInit | null;
  headers?: HeadersInit;
}

interface UseHttpClient {
  loading: boolean;
  error: Error | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendRequest: ({ url, method, body, headers }: RequestParams) => Promise<any>;
  clearError: () => void;
}

export default function useHttpClient(): UseHttpClient {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const activeRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async ({
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' },
    }: RequestParams) => {
      setLoading(true);
      const httpAbortCtrl = new AbortController();
      activeRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();

        activeRequests.current = activeRequests.current.filter(
          (ctrl) => ctrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoading(false);
        return responseData;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setError(undefined);
  };

  // Cleanup possible ongoing requests when unmounting
  useEffect(() => {
    const reqs = activeRequests.current;
    return () => {
      reqs.forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return { loading, error, sendRequest, clearError };
}
