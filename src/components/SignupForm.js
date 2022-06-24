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
  const [error, setError] = useState(null);

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
      .then((user) => {
        console.log(user);
        let errorMessage = "";
        // if there is an error with user then error will print
        if (user.error) {
          console.log(user.error);
          // convert the object into a string
          Object.keys(user.error).forEach((key) => {
            // console.log(key, user.error[key]);
            errorMessage = errorMessage.concat("", `${key} ${user.error[key]}`);
          });
          setError(errorMessage);
          // oterwise render all data
        } else {
          // maintains the state at user signup
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("token", user.jwt);
          dispatch({
            type: "setLoggedInUser",
            // takes in username as its data as it's taken in as a prop that contains the username
            data: user.username,
          });
          dispatch({
            type: "setToken",
            data: user.jwt,
          });
          // cleanup -> resets form after submit
          setFormData(initialFormData);
          navigate("/messages");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Typography variant="h4">Register User</Typography>
      {error && <p>{error}</p>}
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
