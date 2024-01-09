import React, { useState, useEffect, useRef } from "react";

const Login = () => {
  const [loginData, saveLoginData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormErr] = useState({});
  // const [isSubmit, setSubmit] = useState(false);

  const loginRef = useRef(false);
  useEffect(() => {
    loginRef.current.focus();
  }, []);

  const validate = (loginData)=>{
      const errors = {};
      if(!loginData.username){
        errors.username = "UserName is required"
      }
      if(!loginData.password){
        errors.password = "Password is required"
      }
      return errors;
  };

  // useEffect(() => {
  //     if(Object.keys(formError).length === 0 && isSubmit){
  //       console.log(formError);
        
  //     }
  // }, [formError]);

  const submitLoginData = async (e) => {
    e.preventDefault();
    setFormErr(validate(loginData));
    // setSubmit(true);
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
          // required
            placeholder="Enter your UserName:"
            type="text"
            ref={loginRef}
            value={loginData.username}
            onChange={(e) => {
              saveLoginData({ ...loginData, username: e.target.value });
            }}
          />
        </div>
        <p style={{color: "red" }}>{formError.username}</p>
        <div>
          <label htmlFor="password">Password:</label>
          <input
          // required
            placeholder="Enter your Password:"
            type="password"
            value={loginData.password}
            onChange={(e) => {
              saveLoginData({ ...loginData, password: e.target.value });
            }}
          />
        </div>
        <p style={{color: "red" }}>{formError.password}</p>
        <button type="submit">Login</button>
        <a href="/register">Register here</a>
        <a href="/username-fp">Forget Password</a>
      </form>
    </div>
  );
};

export default Login;
