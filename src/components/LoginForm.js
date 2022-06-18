import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authServices";
import { useGlobalState } from "../utils/stateContext";

const LoginForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const initialFormData = {
    email: "",
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
    // console.log("you clicked submit");
    // console.log(formData);
    // activateUser(formData.user);
    signIn(formData).then(({ username, jwt }) => {
      // set session storage
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("token", jwt);
      dispatch({
        type: "setLoggedInUser",
        // takes in email as its data as it's taken in as a prop that contains the email
        data: username,
      });
      dispatch({
        type: "setToken",
        // takes in email as its data as it's taken in as a prop that contains the email
        data: jwt,
      });
    });

    // cleanup -> resets form after submit
    setFormData(initialFormData);
    navigate("/messages");
  };
  return (
    <>
      <Typography variant="h4">Login User</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="email">Email:</InputLabel>
          <TextField
            type="email"
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
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
