import { menu } from "../../../../services/data";

import { Link } from "react-router-dom";

import "./menuad.scss";
import { memo } from "react";

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="menu-list" key={item.id}>
          <h2 className="menu-title">{item.title}</h2>
          {item.listItems.map((listitem) => (
            <Link to={listitem.url} key={listitem.id} className="listItem">
              <img
                className="icon-img"
                src={listitem.icon}
                alt={listitem.title}
              />
              <span>{listitem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(Menu);
