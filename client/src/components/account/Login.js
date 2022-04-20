import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Login({ onLogin }) {
  const [errors, setErrors] = useState([]);
  let history = useHistory();
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
  });

  function handleAccountChange(e) {
    const accountInfoCopy = { ...accountInfo };
    accountInfoCopy[e.target.name] = e.target.value;
    setAccountInfo(accountInfoCopy);
  }

  function handleAccountSubmit(e) {
    e.preventDefault();
    fetch("/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: accountInfo.username,
        password: accountInfo.password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          history.push("/account");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="login-form">
      <form onSubmit={handleAccountSubmit}>
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          onChange={handleAccountChange}
          value={accountInfo.username}
        ></input>
        <br></br>
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={handleAccountChange}
          value={accountInfo.password}
        ></input>
        <br></br>
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
      {errors.length > 0
        ? errors.map((error) => <p key={uuid()}>{error}</p>)
        : null}
      <p className="navvy">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
