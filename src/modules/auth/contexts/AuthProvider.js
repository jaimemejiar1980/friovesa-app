import { API_KEY } from "../../../constants/wordpress";
import { apiPrivate } from "../../../axios";
import { Auth } from "../services";
import { AxiosError } from "axios";
import { decodeJWT } from "../../../lib/utils";
import { errorToast } from "../../../lib/Toast";
import { PLAIN_STORE_KEYS } from "../../../constants/plainStoreKeys";
import { PlainStorage } from "../../../lib/PlainStorage";
import { router } from "expo-router";
import { SessionStoreService } from "../services/SessionStoreService";
import { useEffect, useLayoutEffect, useState } from "react";
import { UserData } from "../dto";
import { UserStoreService } from "../services";
import AuthContext from "./AuthContext";
import lang from "../../../lang/es";

// 24 hours in milliseconds
const HOURS_24 = 24 * 60 * 60 * 1000;

const EMPTY_USER_DATA = new UserData({
  id: "",
  username: "",
  email: "",
});

export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(EMPTY_USER_DATA);
  const [token, setToken] = useState(null);
  console.log("🛡️ AUTH PROVIDER", { isLogged, isLoading, user });

  const initialLoading = async () => {
    setIsLoading(true);
    const { accessToken, refreshToken } = await SessionStoreService.get();

    if (refreshToken) {
      const decoded = decodeJWT(refreshToken);

      const currentTime = new Date();
      const tokenTimeExpiration = new Date(decoded.payload.exp * 1000);

      const timeRemaining = tokenTimeExpiration - currentTime;
      if (timeRemaining < HOURS_24) {
        errorToast({
          title: lang?.yourSessionHasExpired,
          slow: true,
        });

        await onLogout();
        setIsLoading(false);

        return;
      } else {
        const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
        console.log("⏱️ REMAINING HOURS BEFORE AUTO LOGOUT:", hoursRemaining);
      }
    }

    const userData = await UserStoreService.get();

    if (!accessToken || !refreshToken) {
      setUser(EMPTY_USER_DATA);
      setIsLogged(false);
      setIsLoading(false);
      return;
    }

    setUser(userData);
    setToken(accessToken);
    setIsLogged(true);
    setIsLoading(false);
  };

  useEffect(() => {
    initialLoading();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = apiPrivate.interceptors.request.use(
      async (request) => {
        if (token) {
          console.log("🔑 ~ Using Access Token:", token);
          request.headers["X-API-KEY"] = API_KEY;
          request.headers["Authorization"] = `Bearer ${token}`;
        }

        console.log(
          "🚀 ~ Making request with headers: ",
          JSON.stringify(request.headers, null, 2)
        );
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        console.log(
          "❌ REQUEST ERROR: ",
          error,
          JSON.stringify(
            {
              status: error?.response?.status,
              data: error?.response?.data,
            },
            null,
            4
          )
        );

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          console.log("🔄 REFRESHING ACCESS TOKEN AND RETRYING REQUEST...");
          originalRequest._retry = true;

          try {
            const newAccessToken = await Auth.refreshToken();
            setToken(newAccessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            return apiPrivate(originalRequest); // Retry with new token
          } catch (refreshError) {
            console.log(
              "❌ REFRESH TOKEN ERROR: ",
              refreshError,
              JSON.stringify(
                {
                  status: refreshError?.response?.status,
                  data: refreshError?.response?.data,
                },
                null,
                4
              )
            );

            if (
              refreshError instanceof AxiosError &&
              refreshError.response?.status === 403
            ) {
              await onLogout();

              errorToast({
                title: lang?.yourSessionHasExpired,
                slow: true,
              });
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  const checkIsLogged = async () => {
    await initialLoading();
  };

  const onLogout = async () => {
    try {
      console.log("🚪 LOGGING OUT...");
      setIsLoading(true);

      // Cleanup all stored data
      await Promise.all([
        PlainStorage.delete(PLAIN_STORE_KEYS.CART),
        PlainStorage.delete(PLAIN_STORE_KEYS.BILLING),
        PlainStorage.delete(PLAIN_STORE_KEYS.SHIPPING),
        SessionStoreService.delete(),
        UserStoreService.delete(),
      ]);

      // Reset states
      setToken(null);
      setUser(EMPTY_USER_DATA);
      setIsLogged(false);
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLogged,
        checkIsLogged,
        onLogout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
