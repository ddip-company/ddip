import { createContext } from "react";
/** 객체의 형태로 전역 데이터를 담는 store */
export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userInfo: { email: "", nickname: "" },
  loginHandler: (loginReqBody) => {},
  logoutHandler: () => {}
});
