import React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const handleLogout = () => {
    removeCookie("token");
    window.location.href = "/signin";
  };

  useEffect(() => {
    handleLogout();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
};

export default Logout;
