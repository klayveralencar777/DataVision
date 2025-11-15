import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Login from "../app/_components/Login";
import Hearder from "../app/_components/Hearder";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [{ index: true, Component: Hearder }],
  },
  {
    path: "auth",
    children: [
      { path: "login", Component: Login },
      //   { path: "register", Component: Register },
    ],
  },
]);

export default routes;
