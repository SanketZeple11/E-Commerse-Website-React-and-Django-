import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ForgetPassword = () => {
  const location = useLocation();

  let userName = location.state.username;

  const [passwordData, setPasswordData] = useState({
    new_password: "",
    re_new_password: "",
    username: "",
    is_reset_password: true,
  });

  const reset_password = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/user/forget-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data received from the server:", data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <div className="formDiv">
      <form onSubmit={reset_password}>
        <h1>Reset Password</h1>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="text"
            value={passwordData.new_password}
            placeholder="Enter your Password"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                new_password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm New Password</label>
          <input
            type="text"
            value={passwordData.re_new_password}
            placeholder="Enter your Password"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                re_new_password: e.target.value,
                username: userName,
              })
            }
          />
        </div>
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
