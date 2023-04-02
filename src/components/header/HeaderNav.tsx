import React from "react";
import { HeaderInfo } from "./HeaderInfo";
import { HeaderList } from "./HeaderList";

export const HeaderNav: React.FC = () => {
  return (
    <nav>
      <HeaderInfo />
      <HeaderList />
    </nav>
  );
};
