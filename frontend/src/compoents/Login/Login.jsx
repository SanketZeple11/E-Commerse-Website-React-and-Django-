import React, { useState, useEffect, useRef } from "react";

const Login = () => {
  const [loginData, saveLoginData] = useState({
    username: "",
    password: "",
  });

  const loginRef = useRef(false);
  useEffect(() => {
    loginRef.current.focus();
  }, []);

  const submitLoginData = async (e) => {
    console.log(loginData);
    try {
      const response = await fetch("http://localhost:8000/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

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
      <form onSubmit={submitLoginData}>
        <h1>Login Here</h1>
        <div>
          <label htmlFor="username">UserName:</label>
          <input
            placeholder="Enter your UserName:"
            type="text"
            ref={loginRef}
            value={loginData.username}
            onChange={(e) => {
              saveLoginData({ ...loginData, username: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Enter your Password:"
            type="password"
            value={loginData.password}
            onChange={(e) => {
              saveLoginData({ ...loginData, password: e.target.value });
            }}
          />
        </div>
        <button type="submit">Login</button>
        <a href="/register">Register here</a>
        <a href="/forget-password">Forget Password</a>
      </form>
    </div>
  );
};

export default Login;
