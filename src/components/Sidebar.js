import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import CreateRoomBtnModal from './Dashboard/CreateRoomBtnModal'
import DashboardToggle from './Dashboard/DashboardToggle'
import CharRoomList from './rooms/CharRoomList'

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
            
          <div>
             <DashboardToggle/>
             <CreateRoomBtnModal/>
             <Divider>Join conversation</Divider>
          </div>

         <CharRoomList aboveElHeight={height}/>
        </div>
    )
}
