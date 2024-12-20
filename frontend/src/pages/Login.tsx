import React from "react";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return <LoginForm route="server/token/" method="login" />;
};

export default Login;
