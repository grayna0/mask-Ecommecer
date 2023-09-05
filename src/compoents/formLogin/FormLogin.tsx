import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import apiUrl from "../../services/Api";
import "./formlogin.scss";

interface infoUser {
  nickname: string;
  password: string;
}
const LayOut = ({
  changeLayout,
  ChangeLayout,
}: {
  changeLayout: () => void;
  ChangeLayout: boolean;
}) => {
  const { register, handleSubmit } = useForm<infoUser>();
  const [success, setSuccess] = useState<boolean>(false);
  const [infouser, setInfouser] = useState<infoUser[]>([]);

  useEffect(() => {
    fetchData();
  }, [success]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/infoUsers`);
      const jsondata = response.data;
      setInfouser(jsondata);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<infoUser> = async (data) => {
    const checkLogin =infouser.find(user => user.nickname === data.nickname);
    if (ChangeLayout) {
      const infoUser = {
        nickname: data.nickname,
        password: data.password,
      };

      await axios.post(`${apiUrl}/infoUsers`, infoUser);
      setSuccess((success) => !success);
    } else if(checkLogin?.nickname === data.nickname &&
      checkLogin.password === data.password) {
      console.log(222);
      
    }
  };


  return (
    <div className="content-left">
      {!success ? (
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="title-form">
            <h2>{!ChangeLayout ? "LOGIN" : "SIGN IN"}</h2>
          </div>
          <h2>Username</h2>
          <input
            type="email"
            {...register("nickname")}
            placeholder="Your Email..."
          />
          <h2>Password</h2>

          <input
            type="text"
            {...register("password")}
            placeholder="Passwordss..."
          />
          <div className="bottom-form">
            <button onClick={!ChangeLayout ?  handleSubmit(onSubmit) : changeLayout}>
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
            Go back to <span onClick={changeLayout}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
};

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
