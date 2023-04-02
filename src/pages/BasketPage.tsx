import { FC, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BasketCounterBtn } from "../components/BasketCounterBtn";
import "../css/basket.css";
import { BasketSelector } from "../features/basket/selector";
import { clearBasket, deleteProduct } from "../features/basket/slice";

const BasketPage: FC = () => {
  const totalPrice = useSelector(BasketSelector.totalPrice);

  //image src
  const imgSrc = (img: string, i: number) => {
    if (img.includes("http")) {
      return img;
    } else {
      return `/images/${basket[i].product.img}`;
    }
  };
  // btn НАЗАД
  const back = (id: any) => {
    console.log(" back", id);
    alert("back");
  };

  const basket = useSelector(BasketSelector.products);
  const dispatch = useDispatch();

  //dialog
  const [openModal, setOpenModal] = useState(true);
  const openDialog = () => {
    setOpenModal(false);
  };

  const closeDialog = () => {
    setOpenModal(true);
    dispatch(clearBasket());
  };
  return (
    <div className="bask">
      <Link to={"/catalog"} className="btn-back_wrap"> <button className="btn-back btn"><img src="../images/arrow-back.svg" alt="back" /></button> <p>Назад </p> </Link>



      <div className="bask__title">Корзина</div>

      <h1
        style={{ display: basket.length === 0 ? "flex" : "none" }}
        className="pusto"
      >
        В КОРЗИНЕ НИЧЕГО НЕТ
      </h1>
      <hr className="bask__line"></hr>

      <div className="basket-products">
        {basket.map((item, i) => (
          <div key={i}>
            <div className="bask__card">
              <div className="bask__card--img">
                <img
                  className="bask__card--images"
                  src={imgSrc(item.product.img, i)}
                  alt="card"
                />
              </div>

              <div>
                <div className="bask__card--size">
                  <img
                    src={
                      item.product.unit === "Вес"
                        ? "/images/box-icon.svg"
                        : "/images/bottle-icon.svg"
                    }
                    alt="box-icon"
                  />
                  <p className="bask__card--size-text">
                    {item.product.size}{" "}
                    {item.product.unit === "Вес" ? " гр" : " мл"}
                  </p>
                </div>
                <div className="bask__card--title">{item.product.title}</div>
                <div className="bask__card--description">
                  {item.product.description}
                </div>
              </div>

              <hr className="bask__vertical bask__vertical--left"></hr>

              <div className="bask__box">
                <BasketCounterBtn {...item.product} />

                <hr className="bask__vertical"></hr>

                <div className="bask__price">{item.product.price} ₸</div>

                <hr className="bask__vertical"></hr>

                <button
                  type="button"
                  className="bask__btn"
                  onClick={() => {
                    dispatch(deleteProduct(item.product));
                  }}
                >
                  <img src="/images/basket-card.svg" alt="basket-card" />
                </button>
              </div>
            </div>
            <hr className="bask__line"></hr>
          </div>
        ))}
      </div>

      <dialog id="tnkDialog" open={!openModal}>
        <h3 className="dialog__title">Спасибо за заказ!</h3>

        <button
          type="button"
          id="close-btn"
          className="btn btn-close "
          onClick={() => {
            closeDialog();
          }}
        >
          <Link to={"/catalog"}>Спасибо!</Link>{" "}
        </button>
      </dialog>


      <div
        className="bask__footer"
        style={{ display: basket.length === 0 ? "none" : "flex" }}
      >
        <button
          type="button"
          className="bask__checkout"
          id="open-btn"
          onClick={() => {
            openDialog();
          }}
        >
          Оформить заказ
        </button>
        <div className="bask__sum">{totalPrice} ₸</div>
      </div>
    </div>
  );
};

export default BasketPage;
