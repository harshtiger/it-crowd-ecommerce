import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface FILTERED_STATE {
  copyFilteredProducts: Product[];
  filteredProducts: Product[];
}

const INITIAL_STATE: FILTERED_STATE = {
  copyFilteredProducts: [],
  filteredProducts: [],
};

export const reducerFilterProducts = (
  state: FILTERED_STATE = INITIAL_STATE,
  action: ProductActions
): FILTERED_STATE => {
  switch (action.type) {

    default: {
      return { ...state };
    }
  }
};
