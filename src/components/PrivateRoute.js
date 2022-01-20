import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context'

export default function PrivateRoute({ children, ...routeProps }) {

    const { profile, isLoading } = useProfile();

    // here in if condition if loading is true and there is no data in porfile means profile is false 
    // so below condition will be true and show loader
    if (isLoading && !profile) {
        return <Container>
            <Loader center vertical size="md" content="Loading" speed='slow' />
        </Container>
    }
    // here we dont have profile as well as loading is not been formed means that it is a new user 
    // so redirected to signin page
    if (!profile && !isLoading) {
        return <Redirect to="/signin" />
    }
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
// private route is a function to check if profile exist then redirect it else load it 
// other fun are same as public route
