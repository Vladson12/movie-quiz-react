import { useCookies } from "react-cookie";
import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const refresh = async () => {
    try {
      const responseRefresh = await axios.post(
        process.env.REACT_APP_REFRESH_ENDPOINT,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.user.refreshToken}` },
          withCredentials: true,
        }
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
