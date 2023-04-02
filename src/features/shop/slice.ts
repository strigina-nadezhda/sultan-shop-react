import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../products";
import { Range } from "../../utils/range";

export interface ShopFilters {
  manufacturers: string[];
  manufacturersFilter: string;
  priceRange: Range;
  selectedCategories: string[];
}

export interface ShopState {
  categories: string[];
  sortKey: string;
  page: number;
  filters: ShopFilters;
}

const initialState: ShopState = {
  categories: categories,
  sortKey: "titleUp",
  page: 0,
  filters: {
    manufacturers: [],
    manufacturersFilter: "",
    priceRange: {
      start: 0,
      end: 10000,
    },
    selectedCategories: [],
  },
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    changeSortKey: (state, action: PayloadAction<string>) => {
      state.sortKey = action.payload;
    },
    toggleManufacturer: (state, action: PayloadAction<string>) => {
      let set = new Set(state.filters.manufacturers);

      if (set.has(action.payload)) {
        set.delete(action.payload);
      } else {
        set.add(action.payload);
      }

      state.filters.manufacturers = Array.from(set);
    },
    manufactorerFilterChanged: (state, action: PayloadAction<string>) => {
      state.filters.manufacturersFilter = action.payload;
    },
    changePriceRangeStart: (state, action: PayloadAction<number>) => {
      state.filters.priceRange.start = action.payload;
    },
    changePriceRangeEnd: (state, action: PayloadAction<number>) => {
      state.filters.priceRange.end = action.payload;
    },
    changeCategory: (state, action: PayloadAction<string>) => {
      let filterCategories = state.filters.selectedCategories;
      if (filterCategories.includes(action.payload)) {
        let i = filterCategories.indexOf(action.payload);
        filterCategories.splice(i, 1);
      } else {
        filterCategories.push(action.payload);
      }
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  changeSortKey,
  toggleManufacturer,
  manufactorerFilterChanged,
  changePriceRangeStart,
  changePriceRangeEnd,
  changeCategory,
  changePage,
} = shopSlice.actions;

export default shopSlice.reducer;
