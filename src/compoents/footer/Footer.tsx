import React from "react";
import "./footer.scss"
import {menuHome} from "../../services/data"
import { BsInstagram, BsMailbox, BsPhoneFlip, BsTwitter, BsYoutube } from "react-icons/bs";
const Footer = ({pageList}:{pageList:string[]}) => {


         const pageListFillter= [...new Set( pageList.map(page =>
          page
        ))]
   
  return (
    <div className="flex footer container-pg">
      <div className="col1">
        <ul>
          <li className="my-5">logo</li>
          <li className="my-3">
           
            <p> <span><BsMailbox/></span> Lorem ipsum</p>
          </li>
          <li className="my-3">
         
            <p><span><BsPhoneFlip/></span> +1 360 637 6833 Mon-Fri 9:00-17:00</p>
          </li >
          <li className="my-3">© 2023 HYPEBROTHER™</li>
        </ul>
        <div className="flex my-3 gap-3">
          <BsYoutube className="icon-footer"/>
          <BsInstagram className="icon-footer"/>
          <BsTwitter className="icon-footer"/>
        </div>
      </div>
      <div className="col2">
        <p>Categories</p>
        <ul>
        {pageListFillter.map(page =>(
          <li className="my-3">{page}</li>
        ))}
        </ul>
      </div>
      <div className="col3">
        <p>Page</p>
        <ul>
          {menuHome.map(menu =>(
            <li className="my-3">{menu.title}</li>
          ))}
        </ul>
      </div>
      <div className="col4">
        <p>Pay</p>
        <ul>icon Pay</ul>
      </div>
    </div>
  );
};

export default Footer;
