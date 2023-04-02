import React from "react";
import { HeaderNav } from "./HeaderNav";
import { HeaderMenu } from "./HeaderMenu";
import HeaderMobile from "./HeaderMobile";

import "../../css/header.css";

const Header: React.FC = () => {
  return (
    <header className="header-main">
      <HeaderNav />
      <hr className="header-hr" />
      <HeaderMenu />
      <hr className="header-hr" />
      <HeaderMobile />
    </header>
  );
};

export default Header;
