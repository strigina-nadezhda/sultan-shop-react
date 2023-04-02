import { RootState } from "../../store";

export namespace AdminSelector {
  export const editableProduct = (state: RootState) =>
    state.admin.editableProduct;

  export const isDialogOpen = (state: RootState) => state.admin.isDialogOpen;
}
