# Auth 1.2 — Login page and session creation

## Goal

Allow an existing user to log in and start an authenticated session.

This sub-task should create the login flow for existing users and create a valid session when authentication succeeds.

---

## Start State

- Registration flow exists
- At least one valid user can exist in the database
- No working login flow exists yet

---

## End State

- A user can log in through the UI
- Valid credentials create a session
- Invalid credentials show an error without creating a session
- Successful login redirects the user to `/feed`

---

## Scope

Implement only the login flow.

Included:

- Create a login page
- Create a login form
- Validate email and password fields
- Check submitted credentials against the database
- Compare password using the stored password hash
- Create a session using `iron-session` when login succeeds
- Redirect the user to `/feed` after successful login
- Show a generic inline error when login fails

---

## Out of Scope

Do not implement any of the following in this sub-task:

- registration flow
- logout flow
- route protection for authenticated pages
- session persistence across future pages
- password reset
- email verification
- social login
- profile editing

---

## Acceptance Criteria

- User can log in with valid credentials
- Successful login redirects the user to `/feed`
- Invalid credentials show a generic error message
- No session is created when login fails
- A session cookie is created when login succeeds
- Login errors do not reveal whether the email or password was incorrect
- User input remains populated on failed login, except password may be cleared if needed by the implementation

---

## Manual Test Steps

1. Start the app
2. Open the login page
3. Submit valid credentials for an existing account
4. Confirm:
   - login succeeds
   - user is redirected to `/feed`
   - session is created

### Negative Tests

5. Submit with an email that does not exist  
   Confirm a generic "Invalid email or password" style error appears

6. Submit with a valid email and wrong password  
   Confirm the same generic error appears

7. Confirm failed login does not redirect to `/feed`

8. Confirm failed login does not create an authenticated session

9. Confirm the error message does not reveal whether the email or password was incorrect

---

## Notes

- Follow the rules in `PRODUCT.md` and `CLAUDE.md`
- Keep implementation minimal
- Do not implement logout or protected route logic in this task
- Use generic login error messaging only
