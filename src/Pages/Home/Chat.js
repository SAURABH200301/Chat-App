import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { auth } from '../../misc/firebase';
import Bottom from '../../components/chat-window/bottom';
import Messages from '../../components/chat-window/messages';
import Top from '../../components/chat-window/top';
import { CurrentRoomProvide } from '../../context/current-room.context';
import { useRooms } from '../../context/Room.context';
import { TransformToArr } from '../../misc/helper';

export default function Chat() {

    const {chatId} = useParams();

    const rooms = useRooms();

    if(!rooms){
        return<Loader center vertical size="md" content="Loading" speed='slow'/>
    }

    const currentRoom = rooms.find(room => room.id === chatId);

    if(!currentRoom){
        return <h6 className='text-center mt-page'> Chat {chatId} not found</h6>
    }

   const {name,description}=currentRoom;

   const admins = TransformToArr(currentRoom.admin);
   const isAdmin =admins.includes(auth.currentUser.uid);

    const currentRoomData={
        name,
        description,
        admins,
        isAdmin
    }

    

  return <CurrentRoomProvide data={currentRoomData} >
    
      <div className='chat-top'>
         <Top/>
       </div>
       <div className='chat-middle'>
         <Messages/>
       </div>
       <div className='chat-bottom'>
         <Bottom/>
       </div>
  </CurrentRoomProvide>;
}
