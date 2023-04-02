import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../store/types/types";

export interface BasketState {
  products: BasketItem[];
}
export interface BasketItem {
  product: IProduct;
  count: number;
}

const initialState: BasketState = _readInitialBasket() ?? {
  products: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      let index = state.products.findIndex(
        (e) => e.product.barcode === action.payload.barcode
      );
      if (index >= 0) {
        state.products[index].count++;
      } else {
        state.products.push({
          product: action.payload,
          count: 1,
        });
      }
    },
    removeProduct(state, action: PayloadAction<IProduct>) {
      let index = state.products.findIndex(
        (e) => e.product.barcode === action.payload.barcode
      );

      state.products[index].count--;

      if (state.products[index].count === 0) {
        state.products.splice(index, 1);
      }
    },
    deleteProduct(state, action: PayloadAction<IProduct>) {
      let index = state.products.findIndex(
        (e) => e.product.barcode === action.payload.barcode
      );
      state.products.splice(index, 1);
    },
    clearBasket(state) {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, deleteProduct, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;

function _readInitialBasket(): BasketState | null {
  const json = localStorage.getItem("basket");
  if (json) {
    return JSON.parse(json);
  }

  return null;
}
