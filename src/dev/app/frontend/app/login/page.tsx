'use client'

import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import axios from "../../pulgins/axios";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useForm } from "react-hook-form"

type FormData = {
  username: string
  password: string
}


export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [authError, setAuthError] = useState("")
  const router = useRouter();
  const defaultTheme = createTheme();

  const onSubmit = (event: any): void => {
    const data: FormData = {
      username: event.username,
      password: event.password
    };

    handleLogin(data);
  };

  const handleLogin = (data: FormData) => {
    axios
      .post("/api/inventory/login", data)
      .then((response) => {
        router.push("/inventory/products");
      })
      .catch(function (error) {
        setAuthError("ユーザー名またはパスワードに誤りがあります")
      });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTo: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {authError && (
            <Typography variant="body2" color="error">
              {authError}
            </Typography>
          )}{" "}
          <TextField
            type="text"
            id="username"
            variant="filled"
            label="ユーザー名(必須)"
            fullWidth
            margin="normal"
            {...register("username", {
              required: "必須入力です."})}
            error={Boolean(errors.password)}
            helperText={errors.password?.message?.toString() || ""}
          />
          <TextField
            type="password"
            id="password"
            variant="filled"
            label="パスワード(必須)"
            autoComplete="current-password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "必須入力です",
              minLength: {
                value: 8,
                message: "8文字以上の文字列にしてください"
              }
            })}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{mt: 3, mb: 2}}
          >
            ログイン
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}