import { BsCart4, BsSearch, BsAppIndicator } from "react-icons/bs";

import { Container } from '@mui/material';
import  "./adnavbar.scss"
import SetingAcount from "../seting/Seting"
const Navbar = () => {
  return (
    <Container maxWidth={false}>
    <div className="navbar">
      <div className="logo">
        <img src="" alt="" />
        <span>logo</span>
      </div>
      <div className="icons">
        <BsCart4  className="icon"/>
        <BsSearch  className="icon"/>
        <BsAppIndicator  className="icon"/>
     
        <SetingAcount />
      </div>
    </div>
    </Container>
  );
};

export default Navbar;
