import React from "react";
import { useHistory } from "react-router-dom";

function Account({ user, onLogin }) {
  let history = useHistory();

  function logOut() {
    fetch("/sessions/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push("/");
      }
    });
  }

  function deleteAccount() {
    fetch("users/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push("/");
      }
    });
  }

  if (!user) return null;
  return (
    <div className="logger">
      <p className="account">{user.username}</p>
      <p className="account">{user.points} 🪙 </p>
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
