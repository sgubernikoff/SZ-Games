import React from "react";
import { useHistory } from "react-router-dom";
import Carousel from "react-elastic-carousel";

function Account({ user, onLogin }) {
  const mapItems = user
    ? user.items.map((item) => (
        <div key={item.name} className="back">
          <img src={item.image} alt="purchased item"></img>
          <p className="account">{item.name}</p>
          <p className="account">{item.price} 🪙</p>
        </div>
      ))
    : null;

  let history = useHistory();

  function logOut() {
    fetch("/sessions/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push("/");
      }
    });
  }

  console.log(user);

  function deleteAccount() {
    fetch("users/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push("/");
      }
    });
  }
  // console.log(user);
  // console.log(user.items[0]);
  if (!user) return null;
  return (
    <div className="logger">
      <p className="account">{user.username}</p>
      <p className="account">{user.points} 🪙 </p>
      <div className="cardo">
        <p className="purchase_name">Purchases</p>
        <Carousel>{mapItems}</Carousel>
      </div>
      <div className="accounto">
        <button className="logout" onClick={logOut}>
          Log Out
        </button>
        <button className="delete" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Account;
