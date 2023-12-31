import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import App from "./App";
import { Header } from "./components";
// import { LogInPage, SignUpPage, DashboardPage } from "./pages";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LogInPage />,
//   },
//   {
//     path: "/sign-up",
//     element: <SignUpPage />,
//   },
//   {
//     path: "/dashboard/:id",
//     element: <App />,
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    {/* <Header /> */}
    <App />
  </BrowserRouter>
);


// root.render(<RouterProvider router={router} />);
