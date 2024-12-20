import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
//import "../styles/Form.css";

interface RegisterFormProps {
  route: string;
  method: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(route, { username, password });
      if (method === "register") {
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Register</h1>
      <br />
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <br />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br />
      {loading && <p>Loading...</p>}
      <button className="form-button" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
