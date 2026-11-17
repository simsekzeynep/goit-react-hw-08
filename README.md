# GoIT React Homework 08 — Private Phonebook

Final React homework. This project adds account registration, login, logout, session restoration,
and private contacts to the HW-07 phonebook.

## Stack

Vite, React, React Router, Redux Toolkit, Redux Persist, Axios, Formik, Yup, CSS Modules.

## API

The app uses the GoIT **Connections API**: <https://connections-api.goit.global/>.
Unlike HW-07, this project does **not** use MockAPI and needs **no VITE environment variable**.
Do not use your real passwords or personal contacts for homework demos.

## Run locally

```bash
npm install
npm run dev
```

## Pre-push checks (our standard order)

```bash
npm run format
npm run lint
npm test
npm run build
```

## Auth operations and helpers

| Function          | HTTP request         | Role                                                            |
| ----------------- | -------------------- | --------------------------------------------------------------- |
| `register`        | `POST /users/signup` | Registers the new user and saves the returned session.          |
| `logIn`           | `POST /users/login`  | Signs in an existing user.                                      |
| `logOut`          | `POST /users/logout` | Ends the session and clears the authorization header.           |
| `refreshUser`     | `GET /users/current` | Uses the persisted token to restore the user after refresh.     |
| `setAuthHeader`   | —                    | Adds the JWT to the GoIT Axios instance for protected requests. |
| `clearAuthHeader` | —                    | Removes it after logout or failed session validation.           |

The auth requests and contact requests share the same configured Axios instance,
but the mandatory `axios.defaults.baseURL` setting is also present in `auth/operations.js`
for GoIT fastcheck compatibility. The contacts operations never use the old MockAPI URL.

## Design continuity with HW-07

The authenticated `/contacts` page intentionally retains the HW-07 **Phonebook** heading,
580px content width, spacing, contact form, search box, and contact card styles.
The new header/navigation and auth pages use the same simple neutral palette.
Only the new authentication features require additional layout elements.

## Routes

- `/` — Home
- `/register` — Sign up (restricted for logged-in users)
- `/login` — Log in (restricted for logged-in users)
- `/contacts` — Private contacts; redirects guests to `/login`

## Session flow

1. Register or log in via `/users/signup` or `/users/login`.
2. Persist **only** `auth.token` in localStorage, per the homework specification.
3. On reload, `PersistGate` rehydrates the token; `refreshUser()` fetches `/users/current`.
4. Once the session is verified, contacts can load.
5. On logout, the JWT is cleared, and the Redux contacts list is emptied.

> Security note: this homework explicitly requires a token in localStorage, which is visible
> to same-origin JavaScript. In a real production app, carefully assess the threat model
> and prefer a secure cookie-based session when your backend architecture supports it.

## Build / deploy

Deploy the Vite project to Vercel. The included `vercel.json` routes hard-refresh
requests back to `index.html`, so React Router deep links remain functional.

## Delivery

- Repository: add your public GitHub repo URL
- Live: add your Vercel URL

## File convention

Redux is divided into three features (`auth`, `contacts`, `filters`) with separate
operations, selectors and slices. Each page's **actual component** is in its matching folder, for example
`src/pages/Login/Login.jsx` with `Login.module.css`. For the fastcheck requirement,
a minimal compatibility entrypoint at `src/pages/Login.jsx` re-exports the component.
This preserves both required paths without copying any page logic or importing
from one page component into another. The App imports pages directly from their folders.
