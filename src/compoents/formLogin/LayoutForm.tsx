import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

const LOGIN_FALSE = "UserName or PassWords is wrong";
const PWS_ERROR = "Password must have at least 8 letters";
const REQUIRED = "Information cannot be empty";
const USER_MESS_ERROR = "Account already exists";

export const LayOut = ({
  changeLayout,
  ChangeLayout,
}: {
  changeLayout: () => void;
  ChangeLayout: boolean;
}) => {
  const [checkLogin, setCheckLogin] = useState<boolean>(true);
  const [username, setusername] = useState<string>("false");
  const { checkRegister, registerSuccess } = useSelector(
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
    formState: { errors },
  } = useForm<infoUser>();
  const onSubmit: SubmitHandler<infoUser> = async (data) => {
    const res = await api.get(`/infoUsers/?q=${username}`);
    const resjson = res.data[0];

    if (ChangeLayout) {
      // @ts-ignore
      dispatch(actionRegister(data));
    } else if (
      resjson.nickname === data.nickname &&
      resjson.password === data.password
    ) {
      // @ts-ignore
      dispatch(actionLogin(username));

      navigate("/");
    } else {
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
            onKeyDown={() => dispatch(registerDone("hiden-error"))}
            onChange={(e) => setusername(e.target.value)}
          />

          {!checkRegister && (
            <p role="alert" className="error-login">
              {!checkRegister ? USER_MESS_ERROR : REQUIRED}
            </p>
          )}
          <h2>Password</h2>

          <input
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Passwordss..."
            onKeyDown={() => dispatch(registerDone("hiden-error"))}
          />
          {!checkRegister && (
            <p role="alert" className="error-login">
              {errors.password?.type === "required" ? REQUIRED : PWS_ERROR}
            </p>
          )}
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
