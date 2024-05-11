import axios, { AxiosError } from "axios";
import $api from "@/http";

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export const authService = {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/login",
        { email, password },
        { withCredentials: true },
      );

      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const data = axiosError.response.data as ErrorResponse;
          throw new Error(data.message);
        } else {
          console.log("Error message:", axiosError.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  },

  async logout(): Promise<any> {
    try {
      const response = await $api.get(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/logout",
      );
      localStorage.removeItem("accessToken");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const data = axiosError.response.data as ErrorResponse;
          throw new Error(data.message);
        } else {
          console.log("Error message:", axiosError.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  },

  // async checkAuth(): Promise<any> {
  //   try {
  //     return fetch(process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/checkauth", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     });
  //   } catch (error: unknown) {
  //     console.log(error);
  // if (axios.isAxiosError(error)) {
  //   const axiosError = error as AxiosError;
  //   if (axiosError.response) {
  //     const data = axiosError.response.data as ErrorResponse;
  //     throw new Error(data.message);
  //   } else {
  //     console.log("Error message:", axiosError.message);
  //   }
  // } else {
  //   console.error("Unknown error:", error);
  // }
  //   }
  // },

  // async checkAuth(): Promise<any> {
  //   try {
  //     const response = await axios.get(
  //       process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/refresh",
  //       { withCredentials: true },
  //     );
  //
  //     // const data = await response.json();
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as AxiosError;
  //       if (axiosError.response) {
  //         // throw new Error(axiosError.response.data?.message || "");
  //         return axiosError.response.data;
  //       } else {
  //         console.log("Error message:", axiosError.message);
  //       }
  //     } else {
  //       console.error("Unknown error:", error);
  //     }
  //   }
  // },
};
