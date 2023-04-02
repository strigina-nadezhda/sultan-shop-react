import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BasketSelector } from "../features/basket/selector";
import { addProduct } from "../features/basket/slice";
import { IProduct } from "../store/types/types";
import { BasketCounterBtn } from "./BasketCounterBtn";

export const CardProduct: FC<IProduct> = (product: IProduct) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const count = useSelector(BasketSelector.countOfProductInBasket(product));

  const inBasket = count > 0;

  const imgSrc = (img: string) => {
    if (img.includes("http")) {
      return img;
    } else {
      return `/images/${product.img}`;
    }
  };

  const goToProductPage = () => {
    history(`/catalog/${product.barcode}`);
  };

  const showCardTitle = (title: string) => {
    return title.length > 56 ? title.slice(0, 55) + " ..." : title;
  };

  return (
    <div className="card" onClick={goToProductPage}>
      <div className="img">
        <img src={imgSrc(product.img)} alt="card-img" />
      </div>

      <div className="card-size">
        <img
          src={
            product.unit === "Вес"
              ? "/images/box-icon.svg"
              : "/images/bottle-icon.svg"
          }
          alt="box-icon"
          className="icon"
        />
        <p className="card-size_text">
          {product.size} {product.unit === "Вес" ? " гр" : " мл"}
        </p>
      </div>

      <div className="card-content">
        <p className="card-title"> {showCardTitle(product.title)}</p>
        <div className="card-text">
          <p className="card-text_key think blue">Штрихкод:</p>
          <p className="card-text_value"> {product.barcode}</p>
          <p className="card-text_key think blue">Производитель:</p>
          <p className="card-text_value">{product.manufacturer} </p>
          <p className="card-text_key think blue">Бренд:</p>
          <p className="card-text_value">{product.brand} </p>
        </div>
      </div>

      <div className="card-action">
        <p className=" card-action_price">{product.price} ₸</p>
        <button
          className="btn card-action_btn"
          style={{ display: inBasket ? "none" : "flex" }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addProduct(product));
          }}
        >
          В корзину{" "}
          <img src="/images/basket-btn.svg" alt="arrow" className="btn-icon" />
        </button>
        <BasketCounterBtn {...product} />
      </div>
    </div>
  );
};
