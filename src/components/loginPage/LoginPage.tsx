"use client";
import React, { useLayoutEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/UI/loadingPage/LoadingPage";
import styles from "./LoginPage.module.scss";
import MyButton from "@/components/UI/myButton/MyButton";
import MyInput from "@/components/UI/myInput/MyInput";

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
      {/*{false ? (*/}
      {/*  <LoadingPage />*/}
      {/*) : (*/}
      <div className={styles.root}>
        <div className={styles.form}>
          <div className={styles.formTitle}>Вход в панель Администратора</div>

          <form action={submitHandler}>
            <div className={styles.input}>
              <MyInput type={"email"} placeholder={"email"} name={"email"} />
            </div>
            <div className={styles.input}>
              <MyInput
                type={"password"}
                placeholder={"password"}
                name={"password"}
              />
            </div>
            <div className={styles.loginBtn}>
              <MyButton type={"submit"}>Войти</MyButton>
            </div>
            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      </div>
      {/*)}*/}
    </>
  );
};

export default LoginPage;
