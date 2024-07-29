import { getElement, getValue, resetError, setError } from "./util.js";

getElement("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  resetError();

  let firstName = getValue("first");
  let lastName = getValue("last");
  let email = getValue("email");
  let password = getValue("pass");
  let location = getValue("location");

  if (!firstName || !lastName || !email || !password || !location) {
    setError(
      "Please enter all information to create an entry");
    return;
  }
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password, location }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }

    document.location.replace("/login");
  } catch (err) {
    setError(err);
    return;
  }
});
