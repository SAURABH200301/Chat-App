import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import CreateRoomBtnModal from './Dashboard/CreateRoomBtnModal'
import DashboardToggle from './Dashboard/DashboardToggle'
import ChatRoomList from './rooms/ChatRoomList'

export default function Sidebar() {

    const topSidebarRef= useRef();
    const [height, setHeight] = useState(0);

    useEffect(()=>{
        if(topSidebarRef.current){
            setHeight(topSidebarRef.current.scrollHeight);
        }
    },[topSidebarRef]);
    return (
        <div className='h-100 pt-2'>
            <h2 className='mt-1 mb-2 text-center font-comforter'>Join</h2>
          <div>
             <DashboardToggle/>
             <CreateRoomBtnModal/>
             <Divider style={{ margin: 0, padding: '30px 0' }}>Join conversation</Divider>
          </div>
          <div>
            <ChatRoomList aboveElHeight={height}/>
         </div>
        </div>
    )
}
