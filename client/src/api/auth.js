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
  return http.patch("/users", data, config);
};

export const bungaeCreate = (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.post("/meetings", data, config);
};

export const bungaeList = () => {
  return http.get("/meetings");
};

export const bungaeSearch = (searchParams) => {
  return http.get(
    `/meetings/search?size=10&page=1&keyword=${searchParams.keyword}&country=${searchParams.country}&city=${searchParams.city}&state=${searchParams.state}&street=${searchParams.street}&zipCode=${searchParams.zipCode}&detail=${searchParams.detail}`
  );
};

export const bungaeDelete = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.delete(`/meetings/${id}`, config);
};

export const bungaeUpdate = (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.put(`/meetings/${id}`, data, config);
};

export const participate = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.post(`/meetings/${id}/participate`, null, config);
};

export const leave = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.post(`/meetings/${id}/leave`, null, config);
};
