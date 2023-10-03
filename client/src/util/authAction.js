import { emojiList } from "../static/dummy/emojiList";

const getAuthTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const currentDate = new Date();
  const duration = expirationDate.getTime() - currentDate.getTime();
  return duration;
};

export const getAuthTokenInfo = () => {
  const storedToken = localStorage.getItem("token");
  const storedTokenDuration = getAuthTokenDuration();

  if (!storedToken || storedTokenDuration < 0) {
    return null;
  }

  return { token: storedToken, duration: storedTokenDuration };
};

export const getUserInfo = () => {
  const storedUserInfo = localStorage.getItem("userInfo");

  if (!storedUserInfo) {
    return { email: "", nickname: "" };
  }

  return JSON.parse(storedUserInfo);
};

export const removeStoredTokenInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userInfo");
};

export const getRandomEmoji = () => {
  const randomIdx = Math.floor(Math.random() * emojiList.length);
  return emojiList[randomIdx];
};
