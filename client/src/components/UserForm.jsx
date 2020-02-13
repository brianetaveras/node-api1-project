import React, { useState } from "react";
import axios from "axios";

export default function UserForm({updateUsers}) {
  const [info, setInfo] = useState({});
  const [feedback, setFeedback] = useState(null);

  const handleChanges = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault()
    axios
      .post("http://localhost:8080/users", info)
      .then(res => {
        console.log(res);
        updateUsers(res.data)
      })
      .catch(err => {
        setFeedback(err.message);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input onChange={handleChanges} name="name" placeholder="Name" type="text" />
        <input onChange={handleChanges} name="bio" placeholder="Bio" type="text" />
        {feedback ? <div>{feedback}</div> : null}
        <button>Add</button>
      </form>
    </div>
  );
}
