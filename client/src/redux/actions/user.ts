import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_USER } from "../interface";
import swal from "sweetalert";
const URL_USER = "/api";
const USER_STORAGE = "USER_LOGGED";

const defaultCb = (error: any) => {
  alert(error);
};


 
export const CreateUser = (user: any, cb: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_USER + "/signUp", user);
      const data = response.data;

      if (data.errorMsg) {
        return alert("Something happened");
      }

      dispatch({
        type: TYPES_USER.CREATE_USER,
        payload: {},
      });
      cb(user);

    } catch (error) {
      swal({
        title: "Wrong data",
        text: "This email ir already taken!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: true,
        },
      });
    }
  };
};



export const GetUSer = (email: string, pass: string, cb = defaultCb) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(URL_USER + "/signIn", {
        email,
        password: pass,
      });
      const TOKEN = response.headers["auth-token"];
      
      if (response.status == 200) {
        dispatch({
          type: TYPES_USER.GET_USER,
          payload: {
            email,
            token: TOKEN,
            name: response.data.data.name,
            role: response.data.data.role,
            google: false,
          },
        });
        window.localStorage.setItem(
          USER_STORAGE,
          JSON.stringify({
            email,
            token: TOKEN,
            name: response.data.data.name,
            role: response.data.data.role,
            google: false,
          })
        );
        cb(null); 
      } else {
        cb(response.data.errorMsg);
      }
    } catch (error) {
      swal({
        title: "Wrong data",
        text: "Please try with a diferent email or password",
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      });
    }
  }
};

export const FindUSer = () => {
  const user = window.localStorage.getItem(USER_STORAGE);
  const userExist = user ? JSON.parse(user) : null;

  return {
    type: TYPES_USER.FIND_USER,
    payload: userExist,
  };
};

export const LogoutUser = () => {
  window.localStorage.removeItem(USER_STORAGE);

  return {
    type: TYPES_USER.LOGOUT_USER,
    payload: null,
  };
};

export const getSingleUser = (token: string) => {
  try {
    return async function (dispatch: Dispatch) {
      const user = await axios.get(URL_USER + "/auth/users", {
        headers: {
          "auth-token": token,
        },
      });

      return dispatch({
        type: TYPES_USER.GET_SINGLE_USER,
        payload: user.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

