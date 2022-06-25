// information from the backend, URL

import axios from "axios";

const jitterAPI = axios.create({
  baseURL: "https://jitter-api-backend.herokuapp.com",
});

// to get/post etc we need to add this info for user authentication and session storage
jitterAPI.interceptors.request.use((req) => {
  // send the token in the request
  // generates token from sessionStorage
  const token = sessionStorage.getItem("token");
  // Authorization -> Bearer token -> pasted jwt (in postman)
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default jitterAPI;
