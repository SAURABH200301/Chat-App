import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react/cjs/react.development';
import { Alert } from 'rsuite';
import { database, auth } from '../../../misc/firebase';
import { TransformToArrWithId } from '../../../misc/helper';
import MessageItem from './MessageItem';

export default function Messages() {

  const {chatId} = useParams();
  const [message, setMessage] =useState(null);

  const isChatEmpty = message && message.length===0;
  const canShowMessages = message && message.length>0;

  useEffect(()=>{
    const messagesRef = database.ref('/messages');
    messagesRef.orderByChild('roomId').equalTo(chatId).on('value',(snap)=>{
       const data= TransformToArrWithId(snap.val());

       setMessage(data);
    })

    return ()=>{
      messagesRef.off('value');
    }

  },[chatId])
  
  const handleAdmin = useCallback(async(uid)=>{
      const adminRef = database.ref(`/rooms/${chatId}/admin`);
    
      let alertMsg;

      await adminRef.transaction(admins =>{

        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin Permission Removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin Permission Grant";
          }
        }
        return admins;
      })
      Alert.info(alertMsg,4000);
  },[chatId])

  // to handle likes for msgs

  const handleLike=useCallback( async(msgId)=>{
    const {uid} = auth.currentUser;
    const messagesRef = database.ref(`/messages/${msgId}`);
    
    let alertMsg;

    await messagesRef.transaction(msg =>{

      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount-=1;
          msg.likes[uid] = null;
          alertMsg = "Like Removed";
        } else {
           // below if condition check for like
           
          if(!msg.likes){
            msg.likes ={};
          }
          msg.likeCount+=1;
          msg.likes[uid] = true;
          alertMsg = "Liked";
        }
      }
      return msg;
    })
    Alert.info(alertMsg,4000);
  },[])

  const handleDelete=useCallback(async(msgId)=>{
      
      // eslint-disable-next-line no-alert
      if(!window.confirm('Delete this message')){
        return;
      }

      const isLast = message[message.length-1].id === msgId;
      const updates ={};
      updates[`/messages/${msgId}`]= null;

      // if msg is last and having atleast 2 msgs
      if(isLast && message.length>1){
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...message[message.length-2],
            msgId: message[message.length - 2].id
        }
      }
        // if msg is last and no other msg is there is chat
      if(isLast && message.length === 1){
        updates[`/rooms/${chatId}/lastMessage`]= null;
      }

      try {
        
        await database.ref().update(updates)
         Alert.info('message has been deleted',4000);
      } catch (err) {
        Alert.error(err.message,4000);
      }

  },[chatId, message])

  return <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No Message Yet</li>}
      {canShowMessages && 
      message.map(msg=> 
        <MessageItem 
          key={msg.id} 
          message={msg} 
          handleAdmin={handleAdmin} 
          handleLike={handleLike} 
          handleDelete={handleDelete}
          />
      )}
  </ul>;
}
