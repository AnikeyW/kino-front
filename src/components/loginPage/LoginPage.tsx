"use client";
import React, { useLayoutEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/UI/loadingPage/LoadingPage";

const LoginPage = () => {
  const [error, serError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const submitHandler = async (data: FormData) => {
    const email = data.get("email") || "";
    const password = data.get("password") || "";
    try {
      serError(null);
      const res = await authService.login(
        email.toString(),
        password.toString(),
      );
      console.log(res);

      await router.push("/admin");
    } catch (e: any) {
      serError(e.message.toString());
    }
  };

  // useLayoutEffect(() => {
  // const getIsAuth = async () => {
  //   const response = await authService.checkAuth();
  //   if (response.statusCode !== 401) {
  //     router.push("/admin");
  //   }
  //   setIsLoading(false);
  // };
  //
  // getIsAuth();
  // }, []);

  return (
    <>
      {false ? (
        <LoadingPage />
      ) : (
        <div>
          Вход в панель Администратора
          <form action={submitHandler}>
            <div>
              <input type="email" placeholder={"email"} name={"email"} />
            </div>
            <div>
              <input
                type="password"
                placeholder={"password"}
                name={"password"}
              />
            </div>
            <div>
              <button type={"submit"}>login</button>
            </div>
            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
