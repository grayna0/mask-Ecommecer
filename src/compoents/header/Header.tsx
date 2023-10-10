import React from "react";
import Navbar from "./Navbar";

import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";

const Header = () => {
  const totalQuantity= useSelector((state:any)=>state.addToCart.totalQuantity)
  console.log("total quantity: " + totalQuantity);
  
  return (
    <div className="Header flex">
       <div className="logo">
      <img src="/hypebrother-logo.png" alt="mask-cyberpunk-logo-cyber-illustration-vector" />
    </div>
      <Navbar />
      <div className="right-nav flex gap-4">
        <Link  to='Cart'  className="cart"><BsFillCartFill className="fill-white w-6 h-6"/> </Link>
        <Link to='login'><MdOutlineAccountCircle  className="fill-white w-6 h-6"/></Link>
        <Link to='login'><p className="">LOGIN</p></Link>
        
       
     
       
      </div>
    </div>
  );
};

export default Header;
