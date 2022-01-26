import React from "react";
import { BrowserRouter, Switch } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";
import Home from "./Pages/Home/Index";
import SignIn from "./Pages/SignIn";
import './styles/main.scss'

function App() {
  return (
   
    <BrowserRouter>
     <ProfileProvider>
      <Switch>
        <PublicRoute exact path="/signin">
         <SignIn/>
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
