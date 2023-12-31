import React from "react";
import { Header } from '..'

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }: Props) {

  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
