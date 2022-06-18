// information from the backend, URL

import axios from "axios";

const jitterAPI = axios.create({
  baseURL: "http://localhost:4000",
});

jitterAPI.interceptors.request.use((req) => {
  // send the token in the request
  // generates token from sessionStorage
  const token = sessionStorage.getItem("token");
  console.log(token);
  // Authorization -> Bearer token -> pasted jwt (in postman)
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default jitterAPI;
