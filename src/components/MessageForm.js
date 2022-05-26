import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MessageForm = ({ loggedInUser, addMessage }) => {
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

        <input type="submit" value="post" />
        <button onClick={cleanMessage}>Clean Message</button>
      </form>
    </>
  );
};

export default MessageForm;
