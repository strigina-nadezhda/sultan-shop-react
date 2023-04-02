import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/slice";
import basketReducer from "../features/basket/slice";
import productsReducer from "../features/products/slice";
import shopReducer from "../features/shop/slice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    basket: basketReducer,
    admin: adminReducer,
    products: productsReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "products",
    JSON.stringify(store.getState().products.products)
  );

  localStorage.setItem("basket", JSON.stringify(store.getState().basket));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
