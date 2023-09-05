import React from "react";
import Navbar from "./Navbar";
import Head from "./Head";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="Header flex">
      <Head />
      <Navbar />
      <div className="right-nav flex">
        <Link to='login'>login</Link>
        <Link  to='Checkout' >checkout</Link>
       
      </div>
    </div>
  );
};

export default Header;
