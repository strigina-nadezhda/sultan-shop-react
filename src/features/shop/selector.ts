import { createSelector } from "reselect";
import { ShopFilters } from "./slice";
import { RootState } from "../../store";
import { IProduct } from "../../store/types/types";
import { rangeContains } from "../../utils/range";
import { ProductsSelector } from "../products/selector";

const filters = (state: RootState) => state.shop.filters;
const products = ProductsSelector.products;

export namespace ShopSelector {
  export const sortKey = (state: RootState) => state.shop.sortKey;
  export const categories = (state: RootState) => state.shop.categories;
  export const selectedCategories = (state: RootState) =>
    state.shop.filters.selectedCategories;
  export const pageNum = (state: RootState) => state.shop.page;

  export const filteredProducts = createSelector(
    sortKey,
    products,
    filters,
    (sortKey, products, filters) => {
      const filtered = filter(products, filters);
      const sorted = sort(filtered, sortKey);
      return sorted;
    }
  );

  export const filteredProductsPages = createSelector(
    filteredProducts,
    (filteredProducts) => {
      let pages = [];
      let pageSize = 6;
      let products = filteredProducts;
      for (let i = 0; i < filteredProducts.length; i += pageSize) {
        let page = products.slice(i, i + pageSize);
        pages.push(page);
      }
      return pages;
    }
  );

  export const currentPage = createSelector(
    filteredProductsPages,
    pageNum,
    (pages, pageNumber) => pages[pageNumber]
  );

  export const manufacturers = createSelector(products, (products) =>
    unique(products.map((product) => product.manufacturer))
  );

  export const manufactorerFilter = createSelector(
    (state: RootState) => state.shop.filters.manufacturersFilter,
    (filter) => filter
  );

  export const filteredManufacturers = createSelector(
    manufacturers,
    manufactorerFilter,
    (manufacturers, filter) =>
      manufacturers.filter((e) =>
        e.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
  );

  export const productCountersByManifacturer = createSelector(
    products,
    (products) => {
      let map = new Map<String, number>();

      products
        .map((e) => e.manufacturer)
        .forEach((manufacturer) => {
          let value = map.get(manufacturer) ?? 0;
          map.set(manufacturer, value + 1);
        });

      return map;
    }
  );

  export const selectedManufactorers = createSelector(
    (state: RootState) => state.shop.filters.manufacturers,
    (categories) => categories
  );
}

function sort(products: IProduct[], sortKey: string): IProduct[] {
  if (sortKey === "priceDown") {
    return [...products].sort((a, b) => {
      return parseFloat(a.price) - parseFloat(b.price);
    });
  } else if (sortKey === "priceUp") {
    return [...products].sort((a, b) => {
      return parseFloat(b.price) - parseFloat(a.price);
    });
  } else if (sortKey === "titleUp") {
    return [...products].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return [...products].sort((a, b) => b.title.localeCompare(a.title));
  }
}

function unique<T>(source: Array<T>): Array<T> {
  const set = new Set(source);
  return Array.from(set);
}

function filter(products: IProduct[], filters: ShopFilters): IProduct[] {
  let filtered = products;

  filtered = filterByManufacturers(filters, filtered);
  filtered = filterByPrice(filters, filtered);
  filtered = filterByCategory(filters, filtered);

  return filtered;
}
function filterByManufacturers(filters: ShopFilters, filtered: IProduct[]) {
  if (filters.manufacturers.length !== 0) {
    return filtered.filter((e) =>
      filters.manufacturers.includes(e.manufacturer)
    );
  }

  return filtered;
}

function filterByPrice(filters: ShopFilters, filtered: IProduct[]) {
  return filtered.filter((e) =>
    rangeContains(filters.priceRange, parseFloat(e.price))
  );
}

function filterByCategory(filters: ShopFilters, filtered: IProduct[]) {
  if (filters.selectedCategories.length !== 0) {
    return filtered.filter((e) =>
      e.type?.some((el) => filters.selectedCategories.includes(el))
    );
  } else {
    return filtered;
  }
}
