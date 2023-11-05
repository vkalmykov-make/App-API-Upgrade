import React from "react";
import { AxiosRequestConfig } from "axios";
import { useHttp } from "../components/http-context";

interface IFetcherProps {
  config: AxiosRequestConfig;
  onError: (error: string) => void;
  onSuccess: (resData: any, reqData: any) => void;
}

export const useFetcher = (
  { config, onSuccess, onError }: IFetcherProps,
  fetchAtStart: boolean = true,
  loadingTimeOut: number = 25
) => {
  const { client } = useHttp();
  const [isLoading, setLoading] = React.useState<boolean>();

  const fetch = (data?: any) => {
    setLoading(true);

    if (data) {
      config = {
        ...config,
        data,
      };
    }

    client
      .request({ ...config })
      .then((response) => onSuccess(response.data, config.data || data))
      .catch((ex) => onError(ex.message))
      .finally(
        () => setTimeout(() => setLoading(false), loadingTimeOut)
      );
  };

  React.useEffect(
    () => {
      if (fetchAtStart === true) {
        fetch();
      }
    },
    []);

  return {
    fetch,
    isLoading,
  };
};
