# Auth 1.3 — Logout

## Goal

Allow an authenticated user to log out, clearing their session and returning them to the login page.

---

## Start State

- Registration and login flows exist
- A valid session cookie is created on login
- No logout flow exists yet

---

## End State

- A logout button exists on the profile page
- Clicking it destroys the session and redirects to `/login`

---

## Scope

Implement only the logout flow.

Included:

- Create a `logoutAction` server action that destroys the session
- Clear the session cookie
- Add a logout button to the profile page that invokes the action
- Redirect to `/login` after logout

---

## Out of Scope

Do not implement any of the following in this sub-task:

- login flow
- registration flow
- route protection
- session expiry handling
- multi-device session invalidation
- profile page content beyond the logout button

---

## Acceptance Criteria

- A logout button is visible on the profile page
- Clicking the logout button destroys the current session
- The session cookie is cleared
- User is redirected to `/login` after logout

---

## Manual Test Steps

1. Start the app
2. Log in with valid credentials
3. Navigate to `/profile`
4. Confirm the logout button is visible
5. Click the logout button
6. Confirm:
   - User is redirected to `/login`
   - The session cookie is cleared in the browser

---

## Notes

- Follow the rules in `PRODUCT.md` and `CLAUDE.md`
- The logout button lives on the profile page
- Route protection is a separate sub-task and is not part of this implementation
- The profile page may remain minimal in this step
