import React from "react";
import Navbar from "./Navbar";

import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

const Header = () => {
  const totalQuantity= useSelector((state:any)=>state.addToCart.totalQuantity)
  console.log("total quantity: " + totalQuantity);
  
  return (
    <div className="Header flex">
       <div className="logo">
      Logo
    </div>
      <Navbar />
      <div className="right-nav flex">
        <Link to='login'>login</Link>
        <Link  to='Checkout' >Cart :{totalQuantity}</Link>
       
      </div>
    </div>
  );
};

export default Header;
