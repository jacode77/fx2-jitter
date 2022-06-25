import { useGlobalState } from "../utils/stateContext";
import Message from "./Message";
import { useEffect, useState } from "react";
import {
  getMessages,
  getMyMessages,
  getMessageByUser,
} from "../services/messagesServices";
import { useLocation, useParams } from "react-router-dom";

const Messages = () => {
  const { store, dispatch } = useGlobalState();
  const { messageList } = store;
  const [error, setError] = useState(null);
  // location hook
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.pathname === "/messages/mymessages") {
      // pulls this data from messages.services to return the list of messages from the backend
      getMyMessages()
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
    } else if (params.username) {
      getMessageByUser(params.username)
        .then((messages) => {
          if (messages.error) {
            setError(`${params.username} doesn't exist`);
            dispatch({
              type: "setMessageList",
              data: [],
            });
          } else {
            // triggers the reducer to display the data
            dispatch({
              type: "setMessageList",
              data: messages,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
    }

    // will trigger each time location changes, checking the if statement again
  }, [location]);
  return (
    <>
      {error && <p>{error}</p>}
      {messageList.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
};

export default Messages;
