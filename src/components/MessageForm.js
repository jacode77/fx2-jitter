import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";

const MessageForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, messageList } = store;
  const navigate = useNavigate();
  const initialFormData = {
    text: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  //   updates the user with each letter typed. Functions combine user/password
  const handleFormData = (e) => {
    // console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      console.log("Empty message");
    } else {
      console.log(formData);
      // adds message to the list
      addMessage(formData.text);
      cleanMessage();
      navigate("/messages");
    }
  };

  const addMessage = (text) => {
    const message = {
      id: messageList[0].id + 1, //nextId(messageList)
      text: text,
      user: loggedInUser,
    };
    // destructures the list and adds one to the end
    // setMessageList((messageList) => [message, ...messageList]);

    dispatch({
      type: "addMessage",
      data: message,
    });
  };

  const cleanMessage = () => {
    // clears textarea
    setFormData(initialFormData);
  };

  return (
    <>
      <p></p>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            type="text"
            name="text"
            id="text"
            placeholder={`What's on your mind ${loggedInUser}?`}
            value={formData.text}
            onChange={handleFormData}
          ></textarea>
        </div>

        <Button variant="contained" type="submit" value="post">
          Post Message
        </Button>
        <Button variant="contained" onClick={cleanMessage}>
          Clean Message
        </Button>
      </form>
    </>
  );
};

export default MessageForm;
