import axios from "axios";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL_API,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem("accessToken")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken",
    )}`;
    return config;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get<any>(
          process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/refresh",
          {
            withCredentials: true,
          },
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        $api.request(originalRequest);
      } catch (e) {
        console.log("Не авторизован");
      }
    }
    throw error;
  },
);

export default $api;
