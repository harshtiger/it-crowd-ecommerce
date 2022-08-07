import { combineReducers } from "redux";
import { Page, User } from "../interface";
import { Product } from "../interface";
import { USER_STATE, userDetailReducer } from "./userDetailReducer";
import { ORDER_STATE, reducerOrderProducts } from './orderProductsReducer';

import { userReducer } from "./reducerUser";
import { productDetailReducer } from "./reducerProductsDetail";
import { PRODUCTS, reducerProduct } from "./ProductsReducer";
import { reducerCategories, CATEGORIES } from "./categoriesReducer";
import { BRANDS, reducerBrands } from "./brandsReducer";
import setPageReducer, { PAGE } from "./setPageReducer";
import { CART, reducerCart } from "./cartReducer";

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS;
  categories: CATEGORIES;
  brands: BRANDS;
  orderedProducts: ORDER_STATE;

  page: PAGE;
  cart: CART;
  userDetail: USER_STATE;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct,
  categories: reducerCategories,
  userDetail: userDetailReducer,
  brands: reducerBrands,
  page: setPageReducer,
  cart: reducerCart,
  orderedProducts: reducerOrderProducts,

 
});

export type State = ReturnType<typeof rootReducer>;
