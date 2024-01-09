import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserNameFP = () => {
  const [usernameData, setUsername] = useState({
    username: "",
  });

  const navigate = useNavigate();

  const submitUserName = (e) => {
    e.preventDefault();
    navigate("/forget-password", {
      state: {
        username: usernameData.username,
      },
    });
  };

  return (
    <div id="usernameDiv">
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        onChange={(e) =>
          setUsername({
            ...usernameData,
            username: e.target.value,
          })
        }
        value={usernameData.username}
      ></input>
      <button onClick={submitUserName}>Confirm</button>
    </div>
  );
};

export default UserNameFP;
