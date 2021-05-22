import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useMyContext } from "./context/MyContext";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminMenu from "./pages/AdminMenu";
import testPage from "./pages/testPage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContextProvider";
import axios from "axios";
import Home from "./pages/Home";
function App() {
  const { state } = useMyContext();
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState();

  const privateRoutes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/admin",
      component: AdminMenu,
    },
    {
      path: "/profile",
      component: ProfilePage,
    },
  ];

  const publicRoutes = [
    {
      path: "/",
      component: LoginPage,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
    {
      path: "/test",
      component: testPage,
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {state.isAuthen &&
          privateRoutes.map((el, index) => (
            <Route key={index} exact path={el.path} component={el.component} />
          ))}
        {!state.isAuthen &&
          publicRoutes.map((el, index) => (
            <Route key={index} exact path={el.path} component={el.component} />
          ))}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
