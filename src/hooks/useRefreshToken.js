import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.post(
      process.env.REACT_APP_REFRESH_ENDPOINT,
      {},
      {
        headers: { Authorization: `Bearer ${auth.refreshToken}` },
      }
    );
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
