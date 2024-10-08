import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import LoginPage from "./LoginPage"

test("It should render the login title", () => {
  // First we need to make the render of the page
  render(<LoginPage />)

  expect(screen.getByRole("heading", {name: /login/i})).toBeInTheDocument()
})

test("It should render the form elements", () => {
  render(<LoginPage />)

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.getByRole("button", {name: /submit/i})).toBeInTheDocument()
})

test("It should validate the inputs as required", async () => {
  render(<LoginPage />)

  userEvent.click(screen.getByRole("button", {name: /submit/i}))

  // Operation "findByText" returns a promise and is good for this case that "onSubmit" function changes the value of the state
  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(
    await screen.findByText(/The password is required/i),
  ).toBeInTheDocument()
})
