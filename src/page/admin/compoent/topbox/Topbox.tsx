import React from "react";
import { topDealUsers } from "../../../../services/data";
import "./topbox.scss";

const Topbox = () => {
  return (
    <div className="topbox">
      <div className="dealUser">
        <h2> Top Deal</h2>
        <div className="listUser">
          {topDealUsers.map((user) => (
            <div className="listitem" key={user.id}>
              <div className="user">
                <img src={user.img} alt="avatar" />
                <div className="usertexts">
                  <p className="username">{user.username}</p>
                  <p className="email">{user.email}</p>
                </div>
              </div>
              <span className="amount">{user.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topbox;
