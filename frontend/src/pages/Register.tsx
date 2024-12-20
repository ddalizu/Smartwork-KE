import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register: React.FC = () => {
  return <RegisterForm route="server/user/register/" method="register" />;
};

export default Register;
