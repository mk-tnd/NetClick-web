import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useMyContext } from "./context/MyContext";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminMenu from "./pages/AdminMenu";
import Home from "./pages/Home";
import SingleVideoModal from "./component/SingleVideoModal";
function App() {
  const { state } = useMyContext();

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
    {
      path: "/video",
      component: SingleVideoModal,
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
