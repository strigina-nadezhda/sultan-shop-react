import React from "react";
// import "../../css/headerMobile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BasketSelector } from "../../features/basket/selector";
import { MdDensityMedium, MdClose, MdPhone } from "react-icons/md";
import { FC, useState } from "react";
import { HeaderInfo } from "./HeaderInfo";
import "../../css/headerMobile.css";
import { HeaderList } from "./HeaderList";

const HeaderMobile: React.FC = () => {
  const totalCounter = useSelector(BasketSelector.totalCount);

  const [isShownToogle, setIsToogle] = useState(true);
  const menuToogle = () => {
    setIsToogle((current) => !current);
  };

  return (
    <div className="header">
      <div className="header__nav">
        <button className="header__nav--dropdown" onClick={() => menuToogle()}>
          {isShownToogle ? <MdDensityMedium /> : <MdClose />}
        </button>
        <img src="/images/header-logo.svg" alt="card" />
        <div className="basket">
          <Link to={"/basket"}>
            <div className="basket-wrap">
              <span className="basket__counter">{totalCounter}</span>
            </div>
          </Link>
        </div>
      </div>

      <hr className="header__hr" />

      <div className="header__menu">
        <Link to={"/catalog"}>
          <button className="header__menu--catalog">
            <img src="/images/catalog.svg" alt="arrow" className="btn-icon" />
            Каталог
          </button>
        </Link>

        <hr className="bask__vertical header__menu--hr"></hr>

        <div className="header__menu--search">
          <button id="searchBtn" type="submit" name="searchBtn">
            <img src="/images/search.svg" alt="icon" />
          </button>
          <input
            id="searchInput"
            type="text"
            name="searchInput"
            placeholder="Поиск"
          />
        </div>
      </div>

      <hr className="header__hr" />

      {!isShownToogle && (
        <div className="header__dropdown-content">
          <div className="header-contact">
            <HeaderInfo />

            <div className="info">
              <div className="info-content">
                <MdPhone className="info-content_icon" />
                <div className="info-content_text">
                  <p className="bold black">Отдел продаж</p>
                  <a className="think blue" href="tel:+77774900091">
                    +7 (777) 490-00-91
                  </a>
                  <p className="think blue"> время работы: 9:00-20:00</p>
                </div>
              </div>
              <div className="info-content" style={{ margin: 0 }}>
                <button
                  className="header__nav--dropdown"
                  onClick={() => menuToogle()}
                >
                  <MdPhone />
                </button>
                <div className="info-content_text">
                  <a className="think blue"
                    style={{ textDecoration: "underline" }}
                    href="/"
                  >
                    Заказать звонок
                  </a>
                </div>
              </div>
            </div>

            <hr className="bask__line"></hr>

            <div className="title-menu">Меню сайта:</div>
            <HeaderList />
            {/* 
            <div style={{ !sm ? display: "flex", justifyContent: "center" }}> */}
            <button className="btn">
              Прайс-лист
              <img
                src="/images/download.svg"
                alt="arrow"
                className="btn-icon"
              />
            </button>
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;
