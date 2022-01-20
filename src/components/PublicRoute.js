import React from 'react'
import {Redirect ,Route} from 'react-router-dom'
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context'

export default function PublicRoute({children ,...routeProps}) {

    const {profile, isLoading} =useProfile();

      // here in if condition if loading is true and there is no data in porfile means profile is false 
    // so below condition will be true and show loader
    if(isLoading && !profile){
        return <Container>
                 <Loader center vertical size="md" content="Loading" speed='slow'/>
               </Container>
    }

    // here we got profile and loading is also false means data is being loaded so redirect to home page
    if(profile && !isLoading)
      {
          return <Redirect to="/"/>
      }
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}

// public route function is fun which is taking a props children and rest props in routeprops
// returns component Route from react-router-dom with children and props as routeprops
