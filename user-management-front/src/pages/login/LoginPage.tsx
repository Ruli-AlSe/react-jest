import { useState } from "react"
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Avatar,
} from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import CircularProgress from "@mui/material/CircularProgress"
import { loginSchema } from "./loginSchema"
import { Inputs } from "./interfaces"
import { loginService } from "./services"

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

      if (response.status === 401) {
        setErrorMessage("The email or password are not correct")
      } else {
        setErrorMessage("Unexpected error, please try again")
      }
    }
    setIsLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {isLoading && (
          <CircularProgress role="progressbar" aria-label="loading" />
        )}

        {isError && <Typography>{errorMessage}</Typography>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", { required: true })}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password", { required: true })}
            helperText={errors.password?.message}
          />

          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
