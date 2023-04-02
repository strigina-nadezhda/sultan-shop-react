import { RootState } from "../../store";

export namespace ProductsSelector {
  export const products = (state: RootState) => state.products.products;
}
