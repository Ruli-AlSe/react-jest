# Login | Authentication

### As User Management App user, I want a login page as a way of have a protected access to the app.

##### Acceptance Criteria (AC):

- There must be a login page.
- The login page must have a form with the following fields: email, password and
  a submit button.
- The email and password inputs are required.
- If the user leaves empty fields and clicks the submit button, the login page
  should display required messages as the format: “The [field name] is required”
  aside of the proper field.
- The email value should contain the proper email format (the “@”, domain value,
  etc).
- The submit button should be disabbled while the form page is fetching the
  data. After fetching, the submit button does not have to be disabled.
- There should be a loading indicator at the top of the form while it is
  fetching.
- In a unexpected server error, the form page must display the error message
  “Unexpected error, please try again” from the api.
- In the invalid credentials response, the form page must display the error
  message “The email or password are not correct” from the api.

---
