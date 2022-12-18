import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import user_menu from "../../assets/fake-data/user_menus.json";
import DefaultAvatar from "../../assets/images/Default Avatar.jpg";
import "./topnav.css";

const renderUserMenu = (item, index) => (
  <Link to={item.route} key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span style={{ paddingLeft: "10px" }}>{item.content}</span>
    </div>
  </Link>
);
const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img
        src={user?.avatar || DefaultAvatar}
        alt="avt"
        style={{ paddingLeft: "0px" }}
      />
    </div>
    <div className="topnav__right-user__name">{user?.name || ""}</div>
  </div>
);

const TopNav = () => {
  const DOMAIN = "https://hama-be.vercel.app/";

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(user_menu);

  const handleGetUser = async () => {
    await axios
      .get(`${DOMAIN}api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("err", err.response.data);
      });
  };

  useEffect(() => {
    if (token) {
      setMenu(user_menu.filter((item) => item.isToken === true));
      handleGetUser();
    }
    else {
      setMenu(user_menu.filter(item => item.isToken === false));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown */}
          <Dropdown
            customToggle={() => renderUserToggle(user)}
            contentData={menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
