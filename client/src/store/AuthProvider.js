import { AuthContext } from "./auth-context";
import { useCallback, useEffect, useState } from "react";
import * as authAction from "../util/authAction";
import * as authApi from "../api/auth";

let logoutTimer = null;
/** context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할 */
const AuthProvider = (props) => {
  const storedTokenInfo = authAction.getAuthTokenInfo();
  const storedUserInfo = authAction.getUserInfo();

  let initialToken = null;
  let duration = null;
  let initialUserInfo = { email: "", nickname: "" };
  if (storedTokenInfo && storedUserInfo) {
    initialToken = storedTokenInfo.token;
    duration = storedTokenInfo.duration;
    initialUserInfo = storedUserInfo;
  }

  const [token, setToken] = useState(initialToken);
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const isLoggined = !!token;

  const loginHandler = (email, password, tryCatch) => {
    authApi
      .login(email, password)
      .then((res) => {
        const { email, nickname, jwt } = res.data;
        localStorage.setItem("token", jwt);
        localStorage.setItem("userInfo", JSON.stringify({ email, nickname }));

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());

        setToken(jwt);
        setUserInfo({ email, nickname });
      })
      .then(() => {
        tryCatch.try();
      })
      .catch((error) => {
        tryCatch.catch();
      });
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserInfo({ email: "", nickname: "" });
    authAction.removeStoredTokenInfo();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (!token || !duration) {
      return;
    }

    logoutTimer = setTimeout(() => {
      logoutHandler();
    }, [duration]);
  }, [token, duration, logoutHandler]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggined,
        userInfo,
        loginHandler,
        logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;