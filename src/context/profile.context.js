/* eslint-disable react/jsx-no-constructed-context-values */

import { React, createContext, useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const profileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile,setProfile] =useState(null);
    const [isLoading ,setIsLoading] =useState(true);
    
    useEffect(()=>{

        let UserRef;
        let UserStatusRef;

        const authUnSub = auth.onAuthStateChanged(authObj=>{
            
            if(authObj){
                 
                UserStatusRef  = database.ref(`/status/${authObj.uid}`);
                UserRef=database.ref(`/profile/${authObj.uid}`);
                // when any data will be changed this on function will be called which will call, callBack function
                // this is real listener get run when anything is changed in database like we change our nickname it get updated
                UserRef.on('value',(snap)=>{
                      const {name, createdAt, avatar} = snap.val();

                      const data ={
                        name,
                        createdAt,
                        avatar,
                        uid :authObj.uid,
                        email :authObj.email
                      }
                    setProfile(data);
                    setIsLoading(false);
                });

                
        
                database.ref('.info/connected').on('value', (snapshot)=> {
                  
                    if (!!snapshot.val() === false) {
                        return;
                    };
                
                    UserStatusRef.onDisconnect().set(isOfflineForDatabase).then(()=> {
                        UserStatusRef.set(isOnlineForDatabase);
                    });
                });
                

            }else{
                if(UserStatusRef)
                {
                    UserStatusRef.off();
                }

                // this statement will run when we sign off this will unmount the object UserRef

                if(UserRef){
                    UserRef.off();
                }
                database.ref('.info/connected').off();

                setProfile(null);
                setIsLoading(false);
            }
        })

        // this will run when we have to unsubscribe the login
        return ()=>{
            authUnSub();
            if(UserRef){
                UserRef.off();
            }
            if(UserStatusRef){
                 UserStatusRef.off();
            }
            database.ref('.info/connected').off();
        }
    },[])


    return (
         <profileContext.Provider value={{ isLoading, profile}}>
             {children}
        </profileContext.Provider>);
};

export const useProfile =()=> useContext(profileContext);