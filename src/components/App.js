import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import Navigation from "./Navigation";
import initialMessageList from "../data/message-list.json";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import About from "./About";
import NotFound from "./NotFound";
import MessageDetail from "./MessageDetail";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [messageList, setMessageList] = useState([]);

  const activateUser = (username) => {
    setLoggedInUser(username);
  };

  const addMessage = (text) => {
    const message = {
      text: text,
      user: loggedInUser,
      id: messageList[0].id + 1, //nextId(messageList),
    };
    // destructures the list and adds one to the end
    setMessageList((messageList) => [message, ...messageList]);
  };

  function nextId(data) {
    //first exculde the empty data case.
    if (data.length === 0) return 1;

    //second handle if data is not empty
    const sortData = data.sort((a, b) => a.id - b.id);
    const nextId = sortData[sortData.length - 1].id + 1;
    return nextId;
  }

  useEffect(() => {
    //fetch
    setMessageList(initialMessageList);
  }, []);

  return (
    <div>
      <h1>Jitter</h1>

      {/* removes login fields when user logged in && replaces with textfield*/}
      {/* {!loggedInUser ? (
        <LoginForm activateUser={activateUser} />
      ) : (
        <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} />
      )}
      <Messages messageList={messageList} /> */}
      <Router>
        {/* 'Navigation' is in the browser router because it uses the Link component*/}
        <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
        <Routes>
          {/* 'Navigate' redirects the page to where you want */}
          <Route path="/" element={<Navigate to="messages" replace />} />
          {/* No element rendering in "messages" path  to make it a general route whereby other routes can be nested - below */}
          <Route path="messages">
            {/* It is required here instead as this is the element that will be rendered */}
            <Route index element={<Messages messageList={messageList} />} />
            <Route
              path="new"
              element={
                // add logic to prevent sneaky work arounds
                loggedInUser ? (
                  <MessageForm
                    loggedInUser={loggedInUser}
                    // addMessage is the prop
                    addMessage={addMessage}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Routes to individual message, which is passed a prop of messageList so the message list can be accessed*/}
            <Route
              path=":messageId"
              element={<MessageDetail messageList={messageList} />}
            />
          </Route>
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={<LoginForm activateUser={activateUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
