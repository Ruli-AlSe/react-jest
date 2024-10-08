import {Typography, TextField, Button} from "@mui/material"
import {SubmitHandler, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {loginSchema} from "./loginSchema"
import {Inputs} from "./interfaces"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

  return (
    <>
      <Typography component="h1">Login</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email", {required: true})}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", {required: true})}
          helperText={errors.password?.message}
        />

        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
