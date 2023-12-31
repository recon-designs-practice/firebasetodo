import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, firestoreDb } from "../../../firebase";
import { FormControl, TextField, Button } from "@mui/material";
import { Form } from "../../../components";
import useUserStore from "../../../stores/userStore";

// type Props = {};

export default function SignUpForm() {
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passValue, setPassValue] = React.useState("");
  const navigate = useNavigate();

  async function checkDocumentExists(userUID: any) {
    const usersCollectionRef = collection(firestoreDb, "users");

    const q = query(usersCollectionRef, where("user_uid", "==", userUID));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return true;
    } else {
      return false;
    }
  }

  async function addNewUserDocument(documentObj: any) {
    const usersCollectionRef = collection(firestoreDb, "users");

    const { user_uid, user_name, user_email, user_todos } = documentObj;

    await setDoc(doc(usersCollectionRef, user_uid), {
      user_uid,
      user_name,
      user_email,
      user_todos,
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailValue, passValue)
      .then((result: any) => {
        // console.log(444, result)
        checkDocumentExists(result.user.uid).then(async (existsValue) => {
          if (!existsValue) {
            const newUserDocObj = {
              user_uid: result.user.uid,
              user_name: nameValue,
              user_email: emailValue,
              user_todos: [],
            };

            addNewUserDocument(newUserDocObj);
            setCurrentUser({});
          }
        });

        navigate(`/dashboard/${result.user.uid}`);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    // @ts-expect-error
    <Form title="Sign up form" onsubmit={(e: any) => handleSubmit(e)}>
      <FormControl>
        <TextField
          label="Name"
          type="text"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </FormControl>
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
        Sign up
      </Button>
    </Form>
  );
}
