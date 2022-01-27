import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../../misc/firebase';
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


  return <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No Message Yet</li>}
      {canShowMessages && 
      message.map(msg=> <MessageItem key={msg.id} message={msg}/>)}
  </ul>;
}
