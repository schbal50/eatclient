import React from 'react';
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Menus from './Components/Menus'
import Admin from './Components/Admin'
import PublicMenu from './Components/PublicMenu'
import PrivateRoute from './hocs/PrivateRoute'
import UnPrivateRoute from './hocs/UnPrivateRoute'

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/menus" component={Menus} roles={["user", "admin"]} />
      <PrivateRoute path="/admin" component={Admin} roles={["admin"]} />
      <Route exact path="/publicmenu" component={PublicMenu} />
    </Router>
  );
}

export default App;