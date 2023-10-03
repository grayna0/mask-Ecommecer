
import { useSelector } from "react-redux";
import FormLogin from "../compoents/formLogin/FormLogin";

function Login(): JSX.Element {
  const {loginsuccess} =useSelector((state:any)=>state.auth)
  return (
    <div >
     <FormLogin /> 
        
  
     
    </div>
  );
}

export default Login;
