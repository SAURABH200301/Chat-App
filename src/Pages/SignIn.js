import React from 'react'
import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite'
import { auth, database } from '../misc/firebase';

export default function SignIn() {

   const SignInWithProvider = async (provider) =>{
      
      try {
        const {additionalUserInfo, user} =await auth.signInWithPopup(provider);

        if(additionalUserInfo.isNewUser)
        {
            await database.ref(`/profile/${user.uid}`).set({
                name:user.displayName,
                createdAt : firebase.database.ServerValue.TIMESTAMP
            })
        }
        Alert.success('Signed In',4000);
      } catch (err) {
          Alert.info(err.message,4000);
      }
      
   };


   const onFacebookSignIn =()=>{
    SignInWithProvider( new firebase.auth.FacebookAuthProvider());
   };

   const onGoogleSignIn =()=>{
    SignInWithProvider( new firebase.auth.GoogleAuthProvider());
   };
    return (
        <Container>

            <Grid className='mt-page'>
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className='text-center'>
                                <h2>Welcome to Chat</h2>
                                <p>Progressive Chat platform for neophytes</p>
                            </div>
                            <div className='mt-3'>
                                <Button block color='blue' onClick={onFacebookSignIn}>
                                   <Icon icon="facebook "/> Continue with Facebook
                                </Button>
                                <Button block color='red' onClick={onGoogleSignIn}>
                                    <Icon icon="google"/> Continue with Google
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>

        </Container>
    )
}
