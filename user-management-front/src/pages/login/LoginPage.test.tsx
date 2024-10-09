import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import LoginPage from "./LoginPage"

// With this mock function i'm intercepting fetch requests and adding a 1sec delay to pass tests
const getMockingFunction = (type: "error" | "success" | "rejected") => {
  switch (type) {
    case "rejected":
      return jest.fn(
        () =>
          new Promise(resolve =>
            setTimeout(() => {
              resolve(
                new Response(JSON.stringify({ rejected: true, status: 401 })),
              )
            }, 1000),
          ),
      )
    case "error":
      return jest.fn(() => Promise.reject(new Error("Server Error")))
    default:
      return jest.fn(
        () =>
          new Promise(resolve =>
            setTimeout(() => {
              resolve(
                new Response(JSON.stringify({ rejected: false, status: 200 })),
              )
            }, 1000),
          ),
      )
  }
}

beforeEach(() => {
  jest.restoreAllMocks()
})

const getSubmitButton = () => screen.getByRole("button", { name: /submit/i })

const fillAndSendLoginForm = async () => {
  await userEvent.type(screen.getByLabelText(/email/i), "john.doe@mail.com")
  await userEvent.type(screen.getByLabelText(/password/i), "123456")

  await userEvent.click(getSubmitButton())
}

test("It should render the login title", () => {
  // First we need to make the render of the page
  render(<LoginPage />)

  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument()
})

test("It should render the form elements", () => {
  render(<LoginPage />)

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getSubmitButton()).toBeInTheDocument()
})

test("It should validate the inputs as required", async () => {
  render(<LoginPage />)

  await userEvent.click(getSubmitButton())

  // Operation "findByText" returns a promise and is good for this case that "onSubmit" function changes the value of the state
  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(
    await screen.findByText(/The password is required/i),
  ).toBeInTheDocument()
})

test("It should disable the submit button while is fetching", async () => {
  global.fetch = getMockingFunction("success") as jest.Mock

  render(<LoginPage />)

  expect(getSubmitButton()).not.toBeDisabled()

  await fillAndSendLoginForm()

  await waitFor(() => expect(getSubmitButton()).toBeDisabled())
  await waitFor(() => expect(getSubmitButton()).not.toBeDisabled())
})

test("it should show a loading indicator while is fetching the login", async () => {
  global.fetch = getMockingFunction("success") as jest.Mock

  render(<LoginPage />)

  expect(
    screen.queryByRole("progressbar", { name: /loading/i }),
  ).not.toBeInTheDocument()

  await fillAndSendLoginForm()

  await waitFor(() =>
    expect(
      screen.queryByRole("progressbar", { name: /loading/i }),
    ).toBeInTheDocument(),
  )
})

test('it should display "Unexpected error, please try again" when there is an error from the api login', async () => {
  global.fetch = getMockingFunction("error") as jest.Mock

  render(<LoginPage />)
  await fillAndSendLoginForm()

  expect(
    await screen.findByText("Unexpected error, please try again"),
  ).toBeInTheDocument()
})

test('it should display "The email or password are not correct" when the credentials are invalid', async () => {
  global.fetch = getMockingFunction("rejected") as jest.Mock

  render(<LoginPage />)
  await fillAndSendLoginForm()

  expect(
    await screen.findByText("The email or password are not correct"),
  ).toBeInTheDocument()
})
