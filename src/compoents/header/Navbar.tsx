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
    title: "Home",
  },
  {
    id: 2,
    link: "/product",
    title: "Product List",
  },
  {
    id: 3,
    link: "/about",
    title: "About Us",
  },
  {
    id: 4,
    link: "/cart",
    title: "Cart",
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
