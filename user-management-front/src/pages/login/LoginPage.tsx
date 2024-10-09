import { useState } from "react"
import { Typography, TextField, Button } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./loginSchema"
import { Inputs } from "./interfaces"
import { loginService } from "./services"
import CircularProgress from "@mui/material/CircularProgress"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsLoading(true)
    const response = await loginService(email, password)
    if (!response.ok) {
      setIsError(true)
      response.status === 401
        ? setErrorMessage("The email or password are not correct")
        : setErrorMessage("Unexpected error, please try again")
    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && (
        <CircularProgress role="progressbar" aria-label="loading" />
      )}

      <Typography component="h1">Login</Typography>
      {isError && <Typography>{errorMessage}</Typography>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email", { required: true })}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", { required: true })}
          helperText={errors.password?.message}
        />

        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}
