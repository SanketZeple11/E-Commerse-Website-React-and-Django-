import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="indexButton">
      <div>
        <button className="index" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
      <div>
        <button className="index" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Index;
