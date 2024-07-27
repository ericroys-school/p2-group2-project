import { getElement, getValue, resetError, setError } from "./util.js";

getElement("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  resetError();

  let UserName = getValue("user");
  let password = getValue("password");
  
  if (!userName || password) {
    setError(
      "Please enter all information to create an entry");
    return;
  }
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ UserName, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }

    document.location.replace("/");
  } catch (err) {
    setError(err);
    return;
  }
});