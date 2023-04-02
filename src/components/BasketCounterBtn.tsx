import { useDispatch } from "react-redux";
import { IProduct } from "../store/types/types";
import { useSelector } from "react-redux";
import { BasketSelector } from "../features/basket/selector";
import { addProduct, removeProduct } from "../features/basket/slice";

export const BasketCounterBtn = (product: IProduct) => {
    const dispatch = useDispatch();
    const count = useSelector(BasketSelector.countOfProductInBasket(product));

    const inBasket = count > 0;
    return (
        <div className="bask__count" style={{ display: inBasket ? "flex" : "none" }}>
            <button
                className="bask__count--mark"
                style={{ marginRight: "17px" }}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeProduct(product))
                }}
            >
                -
            </button>
            <div>{count}</div>
            <button
                className="bask__count--mark"
                style={{ marginLeft: "17px" }}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addProduct(product))
                }}
            >
                +
            </button>
        </div>
    )
}