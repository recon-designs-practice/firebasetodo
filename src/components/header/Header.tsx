import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useUserStore from "../../stores/userStore";
import { Button } from "@mui/material";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export default function Header({ children }: Props) {
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const navigate = useNavigate();

  const handleClick = () => [
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");

        setCurrentUser(null);

        navigate("/");
      })
      .catch((error) => console.log(error.code, error.message)),
  ];

  return (
    <header
      style={{
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
      <h1>{currentUser ? `${currentUser.user_name}'s todos` : ""}</h1>

      {currentUser && (
        <Button variant="contained" onClick={handleClick}>
          Sign out
        </Button>
      )}
    </header>
  );
}
