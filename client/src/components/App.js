import "../App.css";
import { React, useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import About from "./About";
import Klondike from "./games/Klondike";
import Slots from "./games/Slots";
import Roulette from "./games/Roulette";
import Blackjack from "./games/Blackjack";
import Experiences from "./Experiences";
import Signup from "./account/Signup";
import Login from "./account/Login";
import Account from "./account/Account";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/items/")
  //     .then((res) => res.json())
  //     .then((items) => setItems(items));
  // }, []);

  return (
    <div className="App">
      <Router>
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/klondike">
            <Klondike />
          </Route>
          <Route exact path="/slots">
            <Slots />
          </Route>
          <Route exact path="/roulette">
            <Roulette />
          </Route>
          <Route exact path="/blackjack">
            <Blackjack />
          </Route>
          <Route exact path="/experiences">
            <Experiences items={items} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
