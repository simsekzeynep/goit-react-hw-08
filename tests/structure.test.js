import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (name) =>
  readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const exists = (name) => existsSync(new URL(`../${name}`, import.meta.url));

const components = [
  "App",
  "AppBar",
  "AuthNav",
  "Contact",
  "ContactForm",
  "ContactList",
  "Filter",
  "Layout",
  "LoginForm",
  "RegistrationForm",
  "Navigation",
  "UserMenu",
  "PrivateRoute",
  "RestrictedRoute",
];
const pages = ["Home", "Login", "Registration", "Contacts"];

test("each component has its own matching JSX + CSS module and default export", () => {
  for (const name of components) {
    const path = `src/components/${name}/${name}`;
    assert.ok(exists(`${path}.jsx`), `${path}.jsx`);
    assert.ok(exists(`${path}.module.css`), `${path}.module.css`);
    assert.match(read(`${path}.jsx`), /export default/);
  }
});

test("all four pages have one real component and rubric-compatible entrypoints", () => {
  for (const name of pages) {
    const entrypoint = `src/pages/${name}.jsx`;
    const component = `src/pages/${name}/${name}.jsx`;
    const styles = `src/pages/${name}/${name}.module.css`;

    assert.ok(exists(entrypoint), `${entrypoint} is required by fastcheck`);
    assert.ok(exists(component), component);
    assert.ok(exists(styles), styles);
    assert.match(
      read(component),
      new RegExp(String.raw`export\s+default\s+function\s+${name}\s*\(`),
    );
    assert.match(read(entrypoint), /export\s*\{\s*default\s*\}\s*from/);
    assert.ok(read(entrypoint).includes(`./${name}/${name}.jsx`));
    assert.doesNotMatch(
      read(entrypoint),
      /function\s+|const\s+|useEffect\s*\(/,
    );
  }
});

test("three feature folders have the mandatory Redux files", () => {
  for (const group of ["auth", "contacts", "filters"]) {
    for (const file of ["slice.js", "selectors.js"]) {
      assert.ok(exists(`src/redux/${group}/${file}`));
    }
  }
  for (const group of ["auth", "contacts"])
    assert.ok(exists(`src/redux/${group}/operations.js`));
});

test("auth persist stores only the token", () => {
  const store = read("src/redux/store.js");
  assert.match(store, /persistReducer\(authPersistConfig, authReducer\)/);
  assert.match(store, /whitelist:\s*\["token"\]/);
  assert.match(store, /persistStore\(store\)/);
  for (const name of ["Provider", "PersistGate", "BrowserRouter"])
    assert.match(read("src/main.jsx"), new RegExp(name));
});

test("JWT action types and API endpoints are present", () => {
  const s = read("src/redux/auth/operations.js");
  for (const t of [
    "auth/register",
    "auth/login",
    "auth/logout",
    "auth/refresh",
  ])
    assert.ok(s.includes(t));
  for (const t of [
    "/users/signup",
    "/users/login",
    "/users/logout",
    "/users/current",
  ])
    assert.ok(s.includes(t));
  assert.equal((s.match(/rejectWithValue\(/g) || []).length, 5);
});

test("contacts use GoIT API, not MockAPI, and clear on logout", () => {
  const ops = read("src/redux/contacts/operations.js");
  assert.doesNotMatch(ops, /mockapi|axios\.defaults\.baseURL/i);
  const slice = read("src/redux/contacts/slice.js");
  assert.match(slice, /addCase\(logOut\.fulfilled/);
  assert.match(slice, /state\.items = \[\]/);
});

test("memoized selector lives only in contacts/selectors", () => {
  const selectors = read("src/redux/contacts/selectors.js");
  assert.match(selectors, /createSelector\(/);
  assert.match(selectors, /\[selectContacts, selectNameFilter\]/);
  assert.doesNotMatch(
    read("src/redux/contacts/slice.js"),
    /selectFilteredContacts/,
  );
});

test("login and registration forms dispatch authentication thunks without props", () => {
  const login = read("src/components/LoginForm/LoginForm.jsx");
  const reg = read("src/components/RegistrationForm/RegistrationForm.jsx");
  assert.match(login, /function LoginForm\(\)/);
  assert.match(reg, /function RegistrationForm\(\)/);
  assert.match(login, /dispatch\s*\(\s*logIn\s*\(/);
  assert.match(reg, /dispatch\s*\(\s*register\s*\(/);
});

test("navigation, protected routes and session refresh are present", () => {
  const app = read("src/components/App/App.jsx");
  for (const path of [
    'path="/"',
    'path="/login"',
    'path="/register"',
    'path="/contacts"',
  ])
    assert.ok(app.includes(path));
  assert.match(app, /dispatch\(refreshUser\(\)\)/);
  assert.match(
    read("src/components/PrivateRoute/PrivateRoute.jsx"),
    /selectIsRefreshing/,
  );
  assert.match(
    read("src/components/RestrictedRoute/RestrictedRoute.jsx"),
    /Navigate/,
  );
});

test("Vercel rewrite configuration supports SPA reload", () => {
  const config = JSON.parse(read("vercel.json"));
  assert.ok(config.rewrites.some((x) => x.destination === "/index.html"));
});
