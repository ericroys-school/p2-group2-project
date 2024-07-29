import { getElement, getValue, resetError, setError } from "./util.js";
getElement("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  resetError();
  let email = getValue("user");
  let password = getValue("password");
  if (!email || !password) {
    setError(
      "Please enter all information to log in");
    return;
  }
  try {
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }
    document.location.replace("/profile");
  } catch (err) {
    setError(err);
    return;
  }
});