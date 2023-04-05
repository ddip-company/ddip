import http from "./http";

export const signup = (email, nickname, password) => {
  return http.post("/auth/signup", { email, nickname, password });
};

export const confirmAuthNumber = (email, authNumber) => {
  return http.patch("/auth/confirm", { email, authNumber });
};

export const login = (email, password) => {
  return http.post("/auth/login", { email, password });
};
