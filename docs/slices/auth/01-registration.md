# Auth 1.1 — Registration page and server action

## Goal

Allow a new user to create an account.

This sub-task should create the registration flow for first-time users and persist a valid new account in the database.

---

## Start State

- The project is bootstrapped
- Prisma schema and database are already set up
- No working registration flow exists yet

---

## End State

- A user can register through the UI
- A valid new user record is created in the database
- Passwords are stored hashed
- Validation errors are shown inline without clearing user input
- Successful registration redirects to a registration success page with a login link

---

## Scope

Implement only the registration flow.

Included:

- Create a registration page
- Create a registration form
- Validate required input fields
- Enforce product rules for registration:
  - email is required
  - password is required
  - date of birth is required
  - minimum age is 13+
- Prevent duplicate email registration
- Hash the password before storing it
- Create the new user record in the database
- Redirect to a registration success page after successful registration

---

## Out of Scope

Do not implement any of the following in this sub-task:

- login flow
- automatic login after registration
- session creation
- password reset
- email verification
- social login
- profile editing
- username selection at signup

---

## Acceptance Criteria

- User can submit the registration form
- A new user record is created in the database
- Passwords are stored hashed
- Duplicate email registration is blocked with an inline error
- Underage users are blocked with an inline error
- Invalid input shows inline error messages
- User inputs remain populated when validation fails
- Successful registration redirects to a success page with a login link

---

## Manual Test Steps

1. Start the app
2. Open the registration page
3. Submit valid inputs:
   - valid email
   - password meeting minimum requirements
   - date of birth showing age 13+
4. Confirm:
   - registration succeeds
   - success page appears
   - login link is visible

### Negative Tests

5. Submit with missing fields  
   Confirm inline validation errors appear and entered values remain visible

6. Submit with an invalid email  
   Confirm inline error appears and form values remain populated

7. Submit with a password that is too short  
   Confirm inline error appears and form values remain populated

8. Submit with a date of birth showing under age 13  
   Confirm inline error appears and no user is created

9. Submit with an email that already exists  
   Confirm duplicate email error appears and no second account is created

---

## Notes

- Follow the rules in `PRODUCT.md` and `CLAUDE.md`
- Keep implementation minimal
- Do not create session logic in this task
- Keep error handling limited to the scenarios explicitly defined in the product spec
