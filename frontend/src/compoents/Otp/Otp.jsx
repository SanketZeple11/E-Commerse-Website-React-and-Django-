import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const location = useLocation();
  let userName = location.state.username;

  const navigate = useNavigate();
  const [otpData, setOtpData] = useState({
    otp: "",
    username: "",
  });

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data received from the server:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="formDiv">
      <div>
        <h3>We have send OTP on your email</h3>
        <input
          value={otpData.otp}
          onChange={(e) =>
            setOtpData({
              ...otpData,
              otp: e.target.value,
              username: userName,
            })
          }
        />
      </div>
      <button type="submit" className="buttonForm" onClick={verifyOtp}>
        Verify
      </button>
    </div>
  );
};

export default Otp;
