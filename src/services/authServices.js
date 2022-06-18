import jitterAPI from "../config/api";

// data is a parameter that will be received
export async function signUp(data) {
  // signup method requires a post action
  const response = await jitterAPI.post("/auth/signup", data);
  //   console.log(response.data);
  return response.data;
}

export async function signIn(data) {
  // signup method requires a post action
  const response = await jitterAPI.post("/auth/signin", data);
  // console.log(response.data);
  return response.data;
}
