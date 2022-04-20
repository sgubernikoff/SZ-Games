import "../App.css";
import { React, useEffect, useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import About from "./About";
import Slots from "./games/Slots";
import Roulette from "./games/Roulette";
import Blackjack from "./games/Blackjack";
import Experiences from "./Experiences";
import Casino from "./Casino";
import Signup from "./account/Signup";
import Login from "./account/Login";
import Account from "./account/Account";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  function getItems() {
    fetch("/items")
      .then((res) => res.json())
      .then((items) => setItems(items));
  }

  function getUser() {
    fetch("/users/0").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  useEffect(() => {
    getUser();
    getItems();
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar isLoggedIn={!!user} user={user}/>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/slots">
            <Slots />
          </Route>
          <Route exact path="/roulette">
            <Roulette />
          </Route>
          <Route exact path="/blackjack">
            <Blackjack user={user} reloadUser={getUser} />
          </Route>
          <Route exact path="/casino">
            <Casino isLoggedIn={!!user}/>
          </Route>
          <Route exact path="/experiences">
            <Experiences items={items} />
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={setUser} />
          </Route>
          <Route exact path="/login">
            <Login onLogin={setUser} />
          </Route>
          <Route exact path="/account">
            <Account user={user} onLogin={setUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
