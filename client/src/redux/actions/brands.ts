import axios from "axios";
import { Dispatch } from "redux";

import { TYPES_BRANDS, Brand } from "../interface";

const URL = "/api/brands";

export function getBrands() {
  return async function(dispatch: Dispatch) {
    const brands = await axios.get(URL);

    return dispatch({
      type: TYPES_BRANDS.GET_BRANDS,
      payload: brands.data.data,
    });
  };
}


export function createBrands(brand: Brand, token: string) {
  return async function (dispatch: Dispatch) {
    await axios.post(URL, brand, {
     
      headers: {
        'auth-token': token
      }
    })
  }
}

export const deleteBrand = (id: string, token: string) => {
  try {
    return async function (dispatch: Dispatch) {
     // console.log(id)
      await axios.delete(URL + `/${id}`, {
        headers: {
          'auth-token': token
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}