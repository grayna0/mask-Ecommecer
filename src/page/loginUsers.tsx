import FormLogin from "../compoents/formLogin/FormLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const { loginSuccess } = useSelector((state: any) => state.auth);
   const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess]);
  return (
    <div>
      <FormLogin />
    </div>
  );
}

export default Login;
