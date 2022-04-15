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
        <NavLink exact to="/" exact style={linkStyles} className="nav-element">
          <img className="logo" src="https://i.gifer.com/1iIH.gif"></img>
        </NavLink>
        <NavLink
          exact
          to="/"
          exact
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
          exact
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
          exact
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
          exact
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
          to="/accounts"
          exact
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
