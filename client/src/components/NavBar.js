import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  display: "inline-block",
  float: "left",
  width: "100px",
  margin: "0 .1% .1%",
  background: "transparent",
  textDecoration: "none",
  color: "black",
  fontSize: "15px",
  fontFamily: "Baskerville",
};

function NavBar({ isLoggedIn }) {
  return (
    <div className="navbar">
      <nav className="navbar">
        <NavLink exact to="/" style={linkStyles} className="nav-element">
          <img
            className="logo"
            src="https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F95c10315-70ae-4f8a-ad38-e3729fc04eae_1764x1764.gif"
            alt="logo"
          ></img>
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
          <p className="navvy">Home</p>{" "}
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
          <p className="navvy">About</p>{" "}
        </NavLink>
        <NavLink
          exact
          to="/cal"
          style={linkStyles}
          activeStyle={{
            textDecoration: "underline",
          }}
          className="nav-element"
        >
          {" "}
          <p className="navvy">Calendar</p>{" "}
        </NavLink>

        <a className="header" href="/">
          earn a-way
        </a>
      </nav>
      <nav className="navbar2">
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
          <p className="navvy">Casino</p>{" "}
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
          <p className="navvy">Experiences</p>{" "}
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
          <p className="navvy">Account</p>{" "}
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
