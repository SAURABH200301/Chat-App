import React from 'react';
import TimeAgo from 'timeago-react';

export default function RoomItem({room}) {

  const {createdAt,name}= room;

  return <div>
      <div className='d-flex justify-content-between align-items-center'>
           <h3 className='text-disappear'>{name}</h3>
           <TimeAgo datetime={new Date(createdAt)} className='text-normal text-black-45'/>
      </div>
      <div className='d-flex align-text-center text-black-70'>
          <span>No messages yet...</span>
      </div>
  </div>;
}
