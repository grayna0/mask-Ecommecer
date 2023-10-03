import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./formlogin.scss";
import { useDispatch, useSelector } from "react-redux";
import {  actionLogin, actionRegister, registerDone } from "../../store/slice/authSlice";
import useLocalStorage from "../hook/useLocalStorage";
export interface infoUser {
  nickname: string;
  password: string;
  id: number;
}

function FormLogin(): JSX.Element {
  const [ChangeLayout, setChangeLayout] = useState<boolean>(false);
  const changeLayout = () => {
    setChangeLayout((ChangeLayout) => !ChangeLayout);
  };

  return (
    <div className="content-flex">
      {!ChangeLayout && (
        <LayOut changeLayout={changeLayout} ChangeLayout={ChangeLayout} />
      )}
      {!ChangeLayout && <div className="content-right"></div>}

      {ChangeLayout && <div className="content-right"></div>}
      {ChangeLayout && (
        <LayOut changeLayout={changeLayout} ChangeLayout={ChangeLayout} />
      )}
    </div>
  );
}

export default FormLogin;

const LOGIN_FALSE = "UserName or PassWords is wrong";
const PWS_ERROR = "Password must have at least 8 letters";
const REQUIRED = "Information cannot be empty";
const USER_MESS_ERROR = "Account already exists";
const USER_AND_PW_EMPTY = "Please enter complete information";

const LayOut = ({ changeLayout, ChangeLayout,}: { changeLayout: () => void;ChangeLayout: boolean;}) => {

  const [checkLogin, setCheckLogin] = useState<boolean>(true);
  const [showPws, setShowPws] = useState<boolean>(false);
  const [username, setusername] = useState<string>("false");
  const { name, pws ,checkRegister,registerSuccess} = useSelector((state: any) => state.auth);



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLocalItem } = useLocalStorage();
  useEffect(() => {
     // @ts-ignore
    dispatch(actionLogin(username))  
    return;
  }, [username]);

const backTologin=()=>{
  dispatch(registerDone("show-login"))  
  changeLayout()
}

  const { register, handleSubmit,formState: { errors }} = useForm<infoUser>();
  const onSubmit: SubmitHandler<infoUser> = async (data) => {
    if (ChangeLayout) {
        // @ts-ignore
        dispatch(actionRegister(data));
      
      
    } else if (name === data.nickname && pws === data.password) {
      
      setLocalItem("user", data);
      navigate("/");
    }else{
      setCheckLogin(false);
    }
  };

  return (
    <div className="content-left">
      {!registerSuccess ? (
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="title-form">
            <h2>{!ChangeLayout ? "LOGIN" : "SIGN IN"}</h2>
          </div>
          {!checkLogin && <p>{LOGIN_FALSE}</p>}
          <h2>Username</h2>
          <input
            type="email"
            {...register("nickname", { required: true, minLength: 8 })}
         
            placeholder="Your Email..."
            onKeyDown={() => dispatch(registerDone("hiden-error")) }
          onChange={e=>setusername(e.target.value)}
          />

          {!checkRegister && (
            <p role="alert">
              {!checkRegister ? USER_MESS_ERROR  : REQUIRED}
            </p>
          )}
          <h2>Password</h2>

          <input
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Passwordss..."
            onKeyDown={() => dispatch(registerDone("hiden-error")) }
          />

          {!showPws ? (
            <FaEye className="showpws" />
          ) : (
            <FaEyeSlash className="showpws" />
          )}
          {!checkRegister && (
            <p role="alert">
              {errors.password?.type === "required" ? REQUIRED : PWS_ERROR}
            </p>
          )}
          <div className="bottom-form">
            <button
              onClick={!ChangeLayout ? handleSubmit(onSubmit) : changeLayout}
            >
              Login
            </button>
            <button>
              <input
                onClick={!ChangeLayout ? changeLayout : handleSubmit(onSubmit)}
                type="submit"
                value={"Sign In"}
              />{" "}
            </button>
          </div>
        </form>
      ) : (
        <div className="form-login">
          <h2>Sucssces</h2>
          <p>
            Go back to <span onClick={backTologin}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
};
