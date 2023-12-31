import React, { useState } from "react";

const ForgetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    new_password: "",
    re_new_password: "",
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
                password: e.target.value,
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
                confirm_password: e.target.value,
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
