import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BasketSelector } from "../../features/basket/selector";

export const HeaderMenu: React.FC = () => {
  const totalCounter = useSelector(BasketSelector.totalCount);
  const totalPrice = useSelector(BasketSelector.totalPrice);

  return (
    <div className="menu">
      <Link to={"/"}>
        <img src="/images/header-logo.svg" alt="card" />
      </Link>
      <Link to={"/catalog"}>
        <button className="btn">
          Каталог
          <img src="/images/catalog.svg" alt="arrow" className="btn-icon" />
        </button>
      </Link>

      <div className="searchBar">
        <input
          id="searchInput"
          type="text"
          name="searchInput"
          placeholder="Поиск..."
        />
        <button id="searchBtn" type="submit" name="searchBtn">
          <img src="/images/search.svg" alt="icon" />
        </button>
      </div>

      <div className="manager">
        <div className="manager__text">
          <p className="bold black">+7 (777) 490-00-91</p>
          <p className="think blue">время работы: 9:00-20:00</p>
          <p className="underline blue">Заказать звонок</p>
        </div>
        <img src="/images/callcentre.png" alt="manager" />
      </div>
      <button className="btn manager__btn">
        Прайс-лист
        <img src="/images/download.svg" alt="arrow" className="btn-icon" />
      </button>
      <div className="basket">
        <Link to={"/basket"}>
          <div className="basket-wrap">
            <span className="basket__counter">{totalCounter}</span>
            <span className="basket__title think blue">Корзина</span>
            <span className="basket__amount">{totalPrice} ₸</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
