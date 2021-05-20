import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Home from "./pages/Home";
// import Auth from "./pages/Auth";
// import { useContext } from "react";
// import { AuthContext } from "./contexts/AuthContextProvider";
import { useMyContext } from './context/MyContext'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
function App() {
  // const { isAuth } = useContext(AuthContext);
  const { state } = useMyContext()
  // const isAuth = true;
  const privateRoutes = [
    // {
    //   path: "/",
    //   component: Home,
    // },
    {
      path: '/profile',
      component: ProfilePage
    }

  ];

  const publicRoutes = [
    // {
    //   path: "/",
    //   component: Auth,
    // },
    {
      path: '/',
      component: LoginPage
    }
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
