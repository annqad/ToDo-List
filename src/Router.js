import { Fragment, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToDoList } from "./pages/ToDoList/ToDoList";
import { Posts } from "./pages/Posts/Posts";
import { Profile } from "./pages/Profile/Profile";
import { Welcome } from "./pages/Welcome/Welcome";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Header } from "./components/Header/Header";
import { isAuth } from "./helpers";
import { useRedirect } from "./hooks/useRedirect";

const PrivateRoute = (Component) =>
  isAuth() ? (
    <Fragment>
      <Header />
      <Component />
    </Fragment>
  ) : (
    <Navigate to="/login" replace />
  );

const PublicRoute = (Component) => <Component />;

export const Router = memo(() => {
  useRedirect();

  return (
    <Routes>
      <Route exact path="/" element={PrivateRoute(Welcome)} />
      <Route exact path="/to-do/list" element={PrivateRoute(ToDoList)} />
      <Route exact path="/posts" element={PrivateRoute(Posts)} />
      <Route exact path="/profile" element={PrivateRoute(Profile)} />
      <Route exact path="/login" element={PublicRoute(Login)} />
      <Route exact path="/register" element={PublicRoute(Register)} />
    </Routes>
  );
});
