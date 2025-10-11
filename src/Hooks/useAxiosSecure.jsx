import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useContext(AuthContext);

  useEffect(() => {
    // ✅ Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          console.log(  );
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          signOutUser()
            .then(() => console.log("Signed out for 401/403"))
            .catch((err) => console.error(err));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
