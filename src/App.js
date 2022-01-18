import React from "react";
import { BrowserRouter, Switch } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/signin">
         <SignIn/>
        </PublicRoute>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
