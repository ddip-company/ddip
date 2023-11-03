import axios from "axios";
/** axios모듈화를 위한 함수 */
const instance = axios.create({
  baseURL: "http://15.165.236.107:8080"
});

export default instance;
