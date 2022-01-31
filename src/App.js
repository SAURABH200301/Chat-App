import React,{lazy, Suspense} from "react";
import { BrowserRouter, Switch } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-default.css';
import { ErrorBoundary } from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";
import Home from "./Pages/Home/Index";
// import SignIn from "./Pages/SignIn";
import './styles/main.scss'

const SignIn = lazy(()=> import("./Pages/SignIn"))

function App() {
  return (
   
  <ErrorBoundary>
    <BrowserRouter>
     <ProfileProvider>
      <Switch>
        <PublicRoute exact path="/signin">
        <Suspense fallback={<div>Loading...</div>}>
         <SignIn/>
         </Suspense>
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
      </ProfileProvider>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
