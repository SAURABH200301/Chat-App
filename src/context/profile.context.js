/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable arrow-body-style */
import { React, createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";

const profileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile,setProfile] =useState(null);
    const [isLoading ,setIsLoading] =useState(true);
    
    useEffect(()=>{

        let UserRef;

        const authUnSub = auth.onAuthStateChanged(authObj=>{

            if(authObj){
                 
                UserRef=database.ref(`/profile/${authObj.uid}`);
                // when any data will be changed this on function will be called which will call, callBack function
                // this is real listener get run when anything is changed in database like we change our nickname it get updated
                UserRef.on('value',(snap)=>{
                      const {name, createdAt} = snap.val();

                      const data ={
                        name,
                        createdAt,
                        uid :authObj.uid,
                        email :authObj.email
                      }
                    setProfile(data);
                    setIsLoading(false);
                });
        
            }else{

                // this statement will run when we sign off this will unmount the object UserRef

                if(UserRef){
                    UserRef.off();
                }

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
        }
    },[])


    return (
         <profileContext.Provider value={{ isLoading, profile}}>
             {children}
        </profileContext.Provider>);
};

export const useProfile =()=> useContext(profileContext);