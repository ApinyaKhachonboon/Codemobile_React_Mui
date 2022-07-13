import { AppDispatch } from "..";
import {
  OK,
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  server,
  TOKEN,
} from "../Constants";
import { User } from "../types/user.type";
import { httpClient } from "../utils/httpclient";
import { history } from "..";
import { LoginResult } from "../types/authen.type";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const login = (user: User, navigate: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      // begin connecting...
      dispatch(setLoginFetchingToState());
      // connect
      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      if (result.data.result === OK) {
        setTimeout(() => {
          ///// set token to cache
          localStorage.setItem(TOKEN, result.data.token!);
          dispatch(setLoginSuccessToState(result.data));
          // history.push("/login");
          alert("Login Successfully");
          navigate('/stock');
        }, 1000);
      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      // error
      dispatch(setLoginFailedToState());
    }
  };
};


export const restoreLogin = () => {

  return (dispatch: any) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(setLoginSuccessToState({
        result: OK, 
        token, 
        message: "Login Successfully"
      }));
    }
  };
};
