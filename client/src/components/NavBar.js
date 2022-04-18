import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  display: "inline-block",
  float: "left",
  width: "100px",
  margin: "0 1% 1%",
  background: "white",
  textDecoration: "none",
  color: "black",
  fontSize: "15px",
  fontFamily: "Baskerville",
};

function NavBar({ isLoggedIn }) {
  return (
    <div className="navbar">
      <header>SZ Games</header>
      <nav>
        <NavLink exact to="/" style={linkStyles} className="nav-element">
          <img className="logo" src="https://i.gifer.com/1iIH.gif" alt="logo"></img>
        </NavLink>
        <NavLink
          exact
          to="/"
          style={linkStyles}
          activeStyle={{
            textDecoration: "underline",
          }}
          className="nav-element"
        >
          {" "}
          <p>Home</p>{" "}
        </NavLink>
        <NavLink
          exact
          to="/about"
          style={linkStyles}
          activeStyle={{
            textDecoration: "underline",
          }}
          className="nav-element"
        >
          {" "}
          <p>About</p>{" "}
        </NavLink>
        <NavLink
          exact
          to="/casino"
          style={linkStyles}
          activeStyle={{
            textDecoration: "underline",
          }}
          className="nav-element"
        >
          {" "}
          <p>Casino</p>{" "}
        </NavLink>
        <NavLink
          exact
          to="/experiences"
          style={linkStyles}
          activeStyle={{
            textDecoration: "underline",
          }}
          className="nav-element"
        >
          {" "}
          <p>Experiences</p>{" "}
        </NavLink>
        <NavLink
          exact
          to={isLoggedIn ? "/account" : "/login"}
          style={linkStyles}
          activeStyle={{
            textDecoration: "underline",
          }}
          className="nav-element"
        >
          {" "}
          <p>Account</p>{" "}
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
