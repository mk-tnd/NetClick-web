import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AdminMenu from "./pages/AdminMenu";
// import Home from "./pages/Home";
// import Auth from "./pages/Auth";
// import { useContext } from "react";
// import { AuthContext } from "./contexts/AuthContextProvider";

function App() {
  // const { isAuth } = useContext(AuthContext);
  const isAuth = true;
  const privateRoutes = [
    {
      path: "/",
      component: AdminMenu,
    },
    // {
    //   path: "/",
    //   component: Home,
    // },
  ];

  const publicRoutes = [
    // {
    //   path: "/",
    //   component: Auth,
    // },
  ];
  return (
    <BrowserRouter>
      <Switch>
        {isAuth &&
          privateRoutes.map((el, index) => (
            <Route key={index} exact path={el.path} component={el.component} />
          ))}
        {!isAuth &&
          publicRoutes.map((el, index) => (
            <Route key={index} exact path={el.path} component={el.component} />
          ))}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
