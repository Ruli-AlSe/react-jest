# Admin Story | | Authentication & Authorization

### As admin, I want to have full access to the user management app

##### Acceptance Criteria:

- The admin must be redirected to the admin page after login.
- The admin username should be displayed on the common navbar.
- The admin page should list the users registered with pagination.
  - There should be 10 user per page.
  - There should be the next user info: Full name, email, profile picture,
    access status (active or disabled), role (enum: admin, member) and last
    login date (dd-mm-yyyy format).
- The admin must have access to a search text field for filter users in the
  table.
- The admin must have access to invite user button.
- The admin must have access to update user data button.
- The admin must have access to update user role button.
- The admin must have access to disable user access button.

---
