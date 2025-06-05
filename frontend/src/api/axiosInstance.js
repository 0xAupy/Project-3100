import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // your backend URL
  withCredentials: true, // so cookies are sent (for auth)
});

export default axiosInstance;
