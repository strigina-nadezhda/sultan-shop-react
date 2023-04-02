import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../store/types/types";

export interface AdminState {
  editableProduct: IProduct | null;
  isDialogOpen: boolean;
}

const initialState: AdminState = {
  editableProduct: null,
  isDialogOpen: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    openEditProductDialog(state, action: PayloadAction<IProduct>) {
      state.editableProduct = action.payload;
      state.isDialogOpen = true;
    },
    openCreateProductDialog(state) {
      state.editableProduct = null;
      state.isDialogOpen = true;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
      state.editableProduct = null;
    },
  },
});

export const { openEditProductDialog, openCreateProductDialog, closeDialog } =
  adminSlice.actions;

export default adminSlice.reducer;
