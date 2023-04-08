import { useCookies } from "react-cookie";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const refresh = async () => {
    try {
      const responseRefresh = await axiosPrivate.post(
        process.env.REACT_APP_REFRESH_ENDPOINT
      );
      setCookie(
        "user",
        {
          ...cookies.user,
          accessToken: responseRefresh.data.accessToken,
          refreshToken: responseRefresh.data.refreshToken,
        },
        { path: "/" }
      );
      return responseRefresh.data.accessToken;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuth(null);
        removeCookie("user", { path: "/" });
      }
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
