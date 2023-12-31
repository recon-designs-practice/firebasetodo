import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { FormControl, TextField, Button } from "@mui/material";
import { Form } from "../../../components";

// type Props = {};

export default function LogInForm() {
  const [emailValue, setEmailValue] = React.useState("");
  const [passValue, setPassValue] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailValue, passValue)
      .then((result) => {
        console.log("User is logged in.");

        navigate(`/dashboard/${result.user.uid}`);
      })
      .catch((error) => console.log(error.code, error.message));
  };

  return (
    // @ts-expect-error
    <Form title="Log in form" onsubmit={(e: any) => handleSubmit(e)}>
      <FormControl>
        <TextField
          label="Email"
          type="text"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Password"
          type="password"
          value={passValue}
          onChange={(e) => setPassValue(e.target.value)}
        />
      </FormControl>
      <Button type="submit" variant="contained" size="large">
        Log in
      </Button>
    </Form>
  );
}
