import React from 'react';
import {useHistory} from 'react-router-dom';

function Account({user, onLogin}) {
  let history = useHistory();
  
  function logOut() {
    fetch("/sessions/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push('/');
      }
    });
  }

  function deleteAccount() {
    fetch("users/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push('/');
      }
    })
  }

  if (!user) return null
  return (
    <div>
      <p>{user.name}</p>
      <p>Points: {user.points}</p>
      <button onClick={logOut}>Log out</button>
      <button onClick={deleteAccount}>Delete account</button>
    </div>
  )
}

export default Account