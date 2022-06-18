import React, { useEffect, useReducer } from "react";
import LoginForm from "./LoginForm";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import Navigation from "./Navigation";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import About from "./About";
import NotFound from "./NotFound";
import MessageDetail from "./MessageDetail";
import { reducer } from "../utils/reducer";
import { StateContext } from "../utils/stateContext";
import { getMessages } from "../services/messagesServices";
import SignupForm from "./SignupForm";
// import axios from "axios";

const App = () => {
  // useReducer handles all the states in the same object
  const initialState = {
    // defines the initial message list to an empty array
    messageList: [],
    // check sessionStorage to confirm if a user is loggedin. performed through method getItem to search 'username', if false set to null
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
  };

  // useReducer is a function with two arguments:
  // reducer -> is the function that is executed when...
  // state
  // it returns an array with 2 elements:
  // 1. store (name for the state),
  // 2. dispatch (function that triggers reducer function. Argument is action)
  const [store, dispatch] = useReducer(reducer, initialState);
  // destructures the store (provides state)
  const { loggedInUser } = store;

  // const [loggedInUser, setLoggedInUser] = useState("");
  // const [messageList, setMessageList] = useState([]);

  // function nextId(data) {
  //   //first exculde the empty data case.
  //   if (data.length === 0) return 1;

  //   //second handle if data is not empty
  //   const sortData = data.sort((a, b) => a.id - b.id);
  //   const nextId = sortData[sortData.length - 1].id + 1;
  //   return nextId;
  // }

  useEffect(() => {
    // fetch("http://localhost:4000/messages")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // using axios for a cleaner integration to get data from the backend
    // axios.get("http://localhost:4000/messages").then((response) => {
    //   console.log(response.data);
    //   dispatch({
    //     type: "setMessageList",
    //     data: response.data,
    //   });
    // pulls this data from messages.services to return the list of messages from the backend
    getMessages()
      .then((messages) => {
        // triggers the reducer to display the data
        dispatch({
          type: "setMessageList",
          data: messages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // setMessageList(initialMessageList)
  }, []);

  return (
    <div>
      {/* Wrap all the components that use global state including loggedInUser and messageList in state contsxt provider */}
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          {/* 'Navigation' is in the browser router because it uses the Link component*/}
          <Navigation />
          <Routes>
            {/* 'Navigate' redirects the page to where you want */}
            <Route path="/" element={<Navigate to="messages" replace />} />
            {/* No element rendering in "messages" path  to make it a general route whereby other routes can be nested - below */}
            <Route path="messages">
              {/* It is required here instead as this is the element that will be rendered */}
              <Route index element={<Messages />} />
              <Route
                path="new"
                element={
                  // add logic to prevent sneaky work arounds
                  loggedInUser ? <MessageForm /> : <Navigate to="/login" />
                }
              />
              {/* Routes to individual message, which is passed a prop of messageList so the message list can be accessed*/}
              <Route path=":messageId" element={<MessageDetail />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
