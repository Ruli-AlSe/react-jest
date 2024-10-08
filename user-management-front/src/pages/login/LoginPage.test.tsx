import {screen, render} from "@testing-library/react"
import LoginPage from "./LoginPage"

test("It should render the login title", () => {
  // First we need to make the render of the page
  render(<LoginPage />)

  expect(screen.getByRole("heading", {name: /login/i})).toBeInTheDocument()
})
