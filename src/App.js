import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
// import { AuthProvider } from "./contexts/AuthContext";
import Homepage from "./components/Homepage/Homepage.jsx";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer/Footer.jsx";
import Menu from "./components/Menu/Menu.js";
import Branch from "./components/Branch/Branch";
import UserProfile from "./components/Userprofile/UserProfile";
import Cart from "./components/Cart/Cart.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CreateUserProfile from "./components/Userprofile/CreateUserProfile.js";
import ForgotPassword from "./components/Password/ForgotPassword.js";

function App() {
  return (
    <div className="topLevel">
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/cart" component={Cart} />
        <Redirect exact from="/menu" to="/menu/burger" />
        <Route
          Route
          exact
          path="/menu/:page?"
          render={(props) => <Menu {...props} />}
        />
        <Route exact path="/branch" component={Branch} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
