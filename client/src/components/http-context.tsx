import React from "react";
import Axios, { AxiosInstance } from "axios";
// import { useSnackbar } from "notistack";

const HttpContext = React.createContext<{ client: AxiosInstance }>({
  client: Axios.create(),
});

export const useHttp = () => React.useContext(HttpContext);

export const HttpProvider = ({ children }: React.PropsWithChildren<{}>) => {
  // const { enqueueSnackbar } = useSnackbar();

  return (
    <HttpContext.Provider
      value={{
        client: (() => {
          const _client = Axios.create({
            baseURL: "/api/v1",
            headers: {},
          });

          _client.interceptors.response.use(
            (res) => res,
            (err) => {
              const { status } = err.response;

              const message = (() => {
                switch (status) {
                  case 401:
                    return "Unauthorized";
                  case 403:
                    return "Access Denied";
                  default:
                    return "Something went wrong..";
                }
              })();

              // enqueueSnackbar(message, { variant: "error" });

              return err;
            }
          );

          return _client;
        })(),
      }}
    >
      {children}
    </HttpContext.Provider>
  );
};
