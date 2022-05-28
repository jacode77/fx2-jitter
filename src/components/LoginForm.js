import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";

const LoginForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const initialFormData = {
    user: "",
    password: "",
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

  // sets the click event on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("you clicked submit");
    console.log(formData);
    // activateUser(formData.user);
    dispatch({
      type: "setLoggedInUser",
      // takes in username as its data as it's taken in as a prop that contains the username
      data: formData.user,
    });
    // cleanup -> resets form after submit
    setFormData(initialFormData);
    navigate("/messages");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            name="user"
            id="user"
            value={formData.user}
            onChange={handleFormData}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
