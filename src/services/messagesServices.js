import jitterAPI from "../config/api";

// this returns the message list from the backend
export async function getMessages() {
  // must add await to the API call so it runs asyncronously to the correct line
  const response = await jitterAPI.get("/messages");
  // console.log(response.data);
  // needs to return as response.data to be specific of the data response
  return response.data;
}

// adds new message to the backend. Need to pass data as a parameter so the backend receives
export async function createMessage(data) {
  const response = await jitterAPI.post("/messages", data);
  console.log(response.data);
  return response.data;
}

// this returns the message list from the backend of logged in user
export async function getMyMessages() {
  const response = await jitterAPI.get("/messages/mymessages");
  return response.data;
}

// this returns the message list from the backend of searchable users
export async function getMessageByUser(username) {
  const response = await jitterAPI.get(`/messages?username=${username}`);
  return response.data;
}
