import http from "./http";

export const signup = (email, nickname, password, emoji) => {
  return http.post("/auth/signup", { email, nickname, password, emoji });
};

export const confirmAuthNumber = (email, authNumber) => {
  return http.patch("/auth/confirm", { email, authNumber });
};

export const login = (email, password) => {
  return http.post("/auth/login", { email, password });
};

export const nicknameDuplication = (nickname) => {
  return http.get(`/users?nickname=${nickname}`);
};

export const withdraw = (email, password) => {
  return http.delete("/auth/withdraw", { data: { email, password } });
};

export const updateUser = (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  console.log(data, config);
  return http.patch("/users", data, config);
};
// export const changeNickname = (nickname) => {
//   return http.patch(`/auth/users?nickname=${nickname}`);
// };

// export const changePassword = (nickname, password) => {
//   return http.patch(`/auth/users?nickname=${nickname}`, { password });
// };

// export const changeEmoji = (nickname, emoji) => {
//   return http.patch(`/auth/users?nickname=${nickname}`, { emoji });
// };

// export const changePassword = (email, password) => {
//   return http.patch("/auth/password", { email, password });
// };
