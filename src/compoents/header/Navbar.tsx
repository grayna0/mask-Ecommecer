import React from "react";
import {Link} from 'react-router-dom'

interface Nav {
  id: number;
  link: string;
  title: string;
}

const navbar: Nav[] = [
  {
    id: 1,
    link: "/",
    title: "HOME",
  },
  {
    id: 2,
    link: "/shop",
    title: "SHOP",
  },
  {
    id: 3,
    link: "/about",
    title: "ABOUT US",
  },
  {
    id: 4,
    link: "/cart",
    title: "CART",
  }
];

const Navbar: React.FC = () => {
  return (
    <React.Fragment>
      <ul className={"nav-menu flex" }>
        {navbar.map((nav) => (
          <li key={nav.id}>
            <Link to={nav.link}>{nav.title}</Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Navbar;
