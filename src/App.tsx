import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

import "./css/main.css";

import { enableMapSet } from "immer";
import { Breadcrumbs } from "./components/Breadcrumbs";

enableMapSet();

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Breadcrumbs />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
