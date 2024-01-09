import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, saveRegisterData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    email: "",
  });

  const [formError, setFormErrors] = useState({});

  const navigate = useNavigate();

  const first_name_ref = useRef();

  useEffect(() => {
    first_name_ref.current.focus();
  }, []);

  const validate = (registerData) =>{
    const errors = {};
    const usernameRegex = new RegExp("^[a-zA-Z0-9]+$");
    const passwordRegex = new RegExp("^[a-zA-Z0-9]+$");
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

    if(!registerData.first_name){
      errors.first_name = "FirstName is Required"
    }
    if(!registerData.last_name){
      errors.last_name = "LastName is Required"
    }
    if(!registerData.username){
      errors.username = "UserName is Required"
    }
    else if(!usernameRegex.test(registerData.username)){
      errors.username = "UserName is Invalid"
    }
    if(!registerData.password){
      errors.password = "Password is Required"
    }
    else if(!passwordRegex.test(registerData.password)){
      errors.password = "Password is Invalid"
    }
    if(!registerData.confirm_password){
      errors.confirm_password = "Confirm Password is Required"
    }
    else if(registerData.password !== registerData.confirm_password){
      errors.confirm_password = "Password is not similar"
    }
    if(!registerData.email){
      errors.email = "Email is Required"
    }
    else if(!emailRegex.test(registerData.email)){
      errors.email = "Email is Invalid"
    }
    return errors;
  };

  const submitRegisterData = async (e) => {
    e.preventDefault();
    setFormErrors(validate(registerData))
    try {
      const response = await fetch("http://localhost:8000/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data received from the server:", data);
      // navigate.push(`/confirm-otp?username=${registerData.username}`)
      navigate("/confirm-otp", {
        state: {
          username: registerData.username,
        },
      });
      // history.push('/confirm-otp');
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="formDiv">
      <form onSubmit={submitRegisterData}>
        <h1>Register Here</h1>
        <div className="first_name">
          <label htmlFor="first_name">First Name:</label>
          <input
            value={registerData.first_name}
            onChange={(e) => {
              saveRegisterData({
                ...registerData,
                first_name: e.target.value,
              });
            }}
            type="text"
            placeholder="Enter your First Name"
            ref={first_name_ref}
          />
          <p style={{color: "red" }}>{formError.first_name}</p>
        </div>
        <div className="last_name">
          <label htmlFor="last_name">Last Name:</label>
          <input
            value={registerData.last_name}
            onChange={(e) => {
              saveRegisterData({
                ...registerData,
                last_name: e.target.value,
              });
            }}
            type="text"
            placeholder="Enter your Last Name"
          />
        </div>
        <p style={{color: "red" }}>{formError.last_name}</p>
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            value={registerData.email}
            onChange={(e) => {
              saveRegisterData({
                ...registerData,
                email: e.target.value,
              });
            }}
            type="text"
            placeholder="Enter your Email"
          />
        </div>
        <p style={{color: "red" }}>{formError.email}</p>
        <div className="username">
          <label htmlFor="username">UserName:</label>
          <input
            value={registerData.username}
            onChange={(e) => {
              saveRegisterData({
                ...registerData,
                username: e.target.value,
              });
            }}
            type="text"
            placeholder="Enter your UserName"
          />
        </div>
        <p style={{color: "red" }}>{formError.username}</p>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            value={registerData.password}
            onChange={(e) => {
              saveRegisterData({
                ...registerData,
                password: e.target.value,
              });
            }}
            type="password"
            placeholder="Enter your Password"
          />
        </div>
        <p style={{color: "red" }}>{formError.password}</p>
        <div className="confirm_password">
          <label htmlFor="confirm_password">ConfirmPassword:</label>
          <input
            value={registerData.confirm_password}
            onChange={(e) => {
              saveRegisterData({
                ...registerData,
                confirm_password: e.target.value,
              });
            }}
            type="password"
            placeholder="Enter your Password Again"
          />
        </div>
        <p style={{color: "red" }}>{formError.confirm_password}</p>
        <button type="submit">Register</button>
        <a href="/login">Login</a>
      </form>
    </div>
  );
};

export default Register;
