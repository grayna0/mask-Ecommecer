import React from "react";
import Navbar, { MenuPopupState } from "./Navbar";

import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { actionLogOut } from "../../store/slice/authSlice";

const Header = () => {
  const {loginSuccess} =useSelector((state:any)=>state.auth)
  const totalQuantity= useSelector((state:any)=>state.addToCart.totalQuantity)


  const distpatch = useDispatch()
  const navigate = useNavigate();
  const user= loginSuccess ? "LOGOUT" : "LOGIN"
  const linkToLogin= () => {
    if (loginSuccess){
      // @ts-ignore
     distpatch(actionLogOut())
    }else{
      navigate("/login")

    }
  }
  return (
    <div className="Header flex">
       <div className="logo">
      <img src="/hypebrother-logo.png" alt="mask-cyberpunk-logo-cyber-illustration-vector" />
    </div>
      <Navbar />
      <div className="right-nav flex gap-4">
        <Link  to='Cart'  className="cart"><BsFillCartFill className="fill-white w-6 h-6"/> </Link>
        <Link to='user'><MdOutlineAccountCircle  className="fill-white w-6 h-6"/></Link>
        <p onClick={linkToLogin}>{user}</p>
        <MenuPopupState />

        
       
     
       
      </div>
    </div>
  );
};

export default Header;
