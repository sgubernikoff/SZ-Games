import {React} from "react";

function ExperienceCard({ item, user, setUser }) {

  // function handleClick() {
  //   console.log(item.description);
  // }

  function purchaseItem() {
    if (user && (user.points >= item.price)) {
      fetch("/purchases", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id: user.id, item_id: item.id})
      })
      .then(response => response.json())
      .then((data) => setUser({...user, items: [...user.items, data.item], points: data.points}))
    }
    else {
      alert("Not enough points. Play more to buy!")
    }
  }

  return (
    <div className="exp">
      <img className="pic" src={item.image} alt={item.description} />
      <h3>{item.name}</h3>
      <p>{item.price} 🪙</p>
      {
        user && !user.items.map(item => item.id).includes(item.id) ? <button onClick={purchaseItem} className={user ? "" : "disabled-link"}>Purchase</button> : <button className="disabled-link">Purchased</button>
      }
    </div>
  );
}

export default ExperienceCard;
