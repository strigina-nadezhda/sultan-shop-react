import { RootState } from "../../store";
import { IProduct } from "../../store/types/types";

export namespace BasketSelector {
  export const products = (state: RootState) => state.basket.products;

  export const totalCount = (state: RootState) =>
    state.basket.products.map((e) => e.count).reduce((a, b) => a + b, 0);

  export const totalPrice = (state: RootState) =>
    state.basket.products
      .map((e) => e.count * parseFloat(e.product.price))
      .reduce((a, b) => a + b, 0);

  export const countOfProductInBasket =
    (product: IProduct) => (state: RootState) =>
      state.basket.products.find((e) => e.product.barcode === product.barcode)
        ?.count ?? 0;
}
