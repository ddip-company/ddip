import { AuthContext } from "./auth-context";
import { useCallback, useEffect, useState } from "react";
import * as authAction from "../util/authAction";
import * as authApi from "../api/auth";
import { useNavigate } from "react-router-dom";

let logoutTimer = null;
/** context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할 */
const AuthProvider = (props) => {
  const navigate = useNavigate();
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

  const updateUserInfo = (updatedInfo) => {
    setUserInfo(updatedInfo);
  };

  const isLoggined = !!token;

  const loginHandler = async (userEmail, password, tryCatch) => {
    try {
      const res = await authApi.login(userEmail, password);
      const { emoji, email, nickname, jwt } = res.data;
      localStorage.setItem("token", jwt);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ emoji, email, nickname })
      );

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());

      setToken(jwt);
      setUserInfo({ emoji, email, nickname });

      tryCatch.try();
    } catch (error) {
      tryCatch.catch();
    }
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserInfo({ email: "", nickname: "" });
    authAction.removeStoredTokenInfo();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const withdrawHandler = async (email, password, tryCatch) => {
    try {
      await authApi.withdraw(email, password);
      logoutHandler();
      tryCatch.try();
    } catch (error) {
      tryCatch.catch();
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token || !duration) {
      return;
    }

    logoutTimer = setTimeout(() => {
      logoutHandler();
      navigate("/");
    }, [duration]);
  }, [token, duration, logoutHandler, navigate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggined,
        userInfo,
        updateUserInfo,
        loginHandler,
        logoutHandler,
        withdrawHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
