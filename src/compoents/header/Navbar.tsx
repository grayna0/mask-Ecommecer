import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link, useNavigate } from "react-router-dom";
import { BsMenuUp } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";

interface Nav {
  id: number;
  link: string;
  title: string;
  dropDown?: {
    id: number;
    link: string;
    title: string;
  }[];
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
    dropDown: [
      {
        id: 1,
        link: "/shop",
        title: "Helmet",
      },
      {
        id: 2,
        link: "/shop",
        title: "Mask",
      },
    ],
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
  },
];

const Navbar: React.FC = () => {
  return (
    <React.Fragment>
      <ul className={"nav-menu flex"}>
        {navbar.map((nav) => (
          <li key={nav.id}>
            <Link to={nav.link}>{nav.title}</Link>
            {nav.dropDown && (
              <ul className="dropdown">
                {nav.dropDown.map((i, index) => (
                  <li key={index}>
                    {" "}
                    <Link to={i.link}>{i.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Navbar;

export function MenuPopupState({
  linkToLogin,
  user,
}: {
  linkToLogin: () => void;
  user: string;
}) {
  const navigate = useNavigate();
  const linkToPage = (item: Nav) => {
    navigate(item.link);
  };
  return (
    <div className="menu-mobile">
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState: any) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              <BsMenuUp className="fill-white w-6 h-6 " />
            </Button>
            <Menu {...bindMenu(popupState)}>
              {
                <>
                  {navbar.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        linkToPage(item);
                      }}
                    >
                      {item.title}
                    </MenuItem>
                  ))}

                  <MenuItem className="button-nav" onClick={linkToLogin}>
                    {user}
                  </MenuItem>
                  <MenuItem className="button-nav">
                    <Link to="admin/products" className="button-nav">
                      Admin
                    </Link>
                  </MenuItem>
                </>
              }
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
}
