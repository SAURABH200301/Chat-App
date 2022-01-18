import React from 'react'
import {Redirect ,Route} from 'react-router-dom'

export default function PrivateRoute({children ,...routeProps}) {

    const profile =false;

    if(!profile)
      {
          return <Redirect to="/signin"/>
      }
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}