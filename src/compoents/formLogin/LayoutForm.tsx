import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./formlogin.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  actionLogin,
  actionRegister,
  registerDone,
} from "../../store/slice/authSlice";
import { api } from "../../services/Api";
import { useState } from "react";
import { infoUser } from "./type";
import { ToastContainer, toast } from "react-toastify";


export const ContentForm = ({
  changeLayout,
  ChangeLayout,
}: {
  changeLayout: () => void;
  ChangeLayout: boolean;
}) => {

  const [username, setusername] = useState<string>("false");
  const { registerSuccess } = useSelector(
    (state: any) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backTologin = () => {
    dispatch(registerDone("show-login"));
    changeLayout();
  };
  const {
    register,
    handleSubmit,

  } = useForm<infoUser>();
  const onSubmit: SubmitHandler<infoUser> = async (data) => {
    const res = await api.get(`/infoUsers/?q=${username}`);
    const resjson = res.data[0];
    console.log(resjson);
    

    if (ChangeLayout) {
      // @ts-ignore
     const checkUserExit= dispatch(actionRegister(data));
    toast.success(`${checkUserExit ? "Register succeed" : "Register false"}`)

    } else if (
      resjson === undefined 
    ) {

      toast.error("Login false")

    
    } else {
       // @ts-ignore
       dispatch(actionLogin(username));
       toast.success("Login succeed")
       navigate("/");

    }
  };

  return (
    <div className="content-left">
      {!registerSuccess ? (
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="title-form">
            <h2>{!ChangeLayout ? "LOGIN" : "SIGN IN"}</h2>
          </div>

          <h2>Username</h2>
          <input
            type="email"
            {...register("nickname", { required: true, minLength: 8 })}
            placeholder="Your Email..."
            onKeyDown={() => dispatch(registerDone("hiden-error"))}
            onChange={(e) => setusername(e.target.value)}
          />
          <h2>Password</h2>
          <input
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Passwordss..."
            onKeyDown={() => dispatch(registerDone("hiden-error"))}
          />
      
          <div className="bottom-form">
            <button
              onClick={!ChangeLayout ? handleSubmit(onSubmit) : changeLayout}
            >
              Login
            </button>
            <button
              onClick={!ChangeLayout ? changeLayout : handleSubmit(onSubmit)}
            >
              Sign In
            </button>
          </div>
        </form>
      ) : (
        <RegisterSuccess backTologin={backTologin} />
      )}
       <ToastContainer
        position= "top-right"
        autoClose= {8000}
        pauseOnHover= {true}
        draggable= {true}
        theme= "dark"/>
    </div>
  );
};

const RegisterSuccess = ({backTologin}:{backTologin:()=> void}) => {
  return (
    <div className="form-login">
      <h2>Sucssces</h2>
      <p>
        Go back to <span onClick={backTologin}>Login</span>
      </p>
    </div>
  );
};
