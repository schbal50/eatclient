import React from 'react';
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Menus from './Components/Menus/Menus'
import Admin from './Components/Admin'
import PublicMenu from './Components/PublicMenu'
import PrivateRoute from './hocs/PrivateRoute'
import UnPrivateRoute from './hocs/UnPrivateRoute'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/menus" component={Menus} is_staff={[true, false]} />
      <PrivateRoute path="/admin" component={Admin} is_staff={[true]} />
      <Route exact path="/publicmenu" component={PublicMenu} />
    </Router>
  );
}

export default App;
