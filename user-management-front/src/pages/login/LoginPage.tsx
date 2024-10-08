import {Typography, TextField, Button} from "@mui/material"
import {useState} from "react"

export default function LoginPage() {
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("")
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: {value: string}
      password: {value: string}
    }
    const {email, password} = formElements

    if (!email.value) {
      setEmailErrorMsg("The email is required")
    }
    if (!password.value) {
      setPasswordErrorMsg("The password is required")
    }
  }

  return (
    <>
      <Typography component="h1">Login</Typography>

      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" helperText={emailErrorMsg} />
        <TextField
          name="password"
          label="Password"
          type="password"
          helperText={passwordErrorMsg}
        />

        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
