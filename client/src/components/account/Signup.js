import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Signup({ onLogin }) {
  let history = useHistory();
  const [errors, setErrors] = useState([]);
  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleAccountChange(e) {
    const accountInfoCopy = { ...accountInfo };
    accountInfoCopy[e.target.name] = e.target.value;
    setAccountInfo(accountInfoCopy);
  }

  function handleAccountSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: [accountInfo.firstName, accountInfo.lastName].join(" "),
        username: accountInfo.username,
        password: accountInfo.password,
        password_confirmation: accountInfo.passwordConfirmation,
        points: 0
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
        <label htmlFor="firstName">
          <b>First Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          required
          onChange={handleAccountChange}
          value={accountInfo.firstName}
        ></input>
        <br></br>
        <label htmlFor="lastName">
          <b>Last Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          required
          onChange={handleAccountChange}
          value={accountInfo.lastName}
        ></input>
        <br></br>
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
        <label htmlFor="passwordConfirmation">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Confirmation"
          name="passwordConfirmation"
          required
          onChange={handleAccountChange}
          value={accountInfo.passwordConfirmation}
        ></input>
        <br></br>
        <button type="submit" className="login-button">
          Sign up
        </button>
      </form>
      {errors.length > 0
        ? errors.map((error) => <p key={uuid()}>{error}</p>)
        : null}
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
