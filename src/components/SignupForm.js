import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { signUp } from "../services/authServices";

const SignupForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const initialFormData = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    // console.log("you clicked submit");
    // console.log(formData);
    // activateUser(formData.user);
    // add form data so the data is passed in
    signUp(formData)
      .then(({ username, jwt }) => {
        // maintains the state at user signup
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("token", jwt);
        dispatch({
          type: "setLoggedInUser",
          // takes in username as its data as it's taken in as a prop that contains the username
          data: username,
        });
        dispatch({
          type: "setToken",
          data: jwt,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // cleanup -> resets form after submit
    setFormData(initialFormData);
    navigate("/messages");
  };

  return (
    <>
      <Typography variant="h4">Register User</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="email">Username:</InputLabel>
          <TextField
            type="text"
            // must update the name/id correctly or cannot type in form field
            name="username"
            id="username"
            value={formData.username}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel htmlFor="email">Email:</InputLabel>
          <TextField
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password:</InputLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password Confirmation:</InputLabel>
          <TextField
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleFormData}
          />
        </div>
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
