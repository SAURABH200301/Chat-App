/* eslint-disable no-console */

export function getIntialName(name) {
    const SpiltName= name.toUpperCase().split(' ');
    if(SpiltName.length>1)
    {
       return (SpiltName[0][0] + SpiltName[1][0]);
    }

    return SpiltName[0][0];
}

export function TransformToArr(snapVal){
    return snapVal? Object.keys(snapVal) : [];
}

export function TransformToArrWithId(snapVal) {
    return snapVal
      // eslint-disable-next-line arrow-body-style
      ? Object.keys(snapVal).map(roomId => {
          return { ...snapVal[roomId], id: roomId };
        })
      : [];
  }

export async function GetUserUpdates(userId , keyToUpdate, value, db) {
   const updates={}
   
   updates[`/profile/${userId}/${keyToUpdate}`] = value;
   const getMsgs = db.ref('/messages').orderByChild('author/uid').equalTo(userId).once('value');

   const getRooms = db.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(userId).once('value');

   const [ mSnap, rSnap ]= await Promise.all([ getMsgs, getRooms]);

   mSnap.forEach(msgSnap=>{
       updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`]=value;
   });

   rSnap.forEach(roomSnap=>{
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`]=value;
   });

   return updates;

}

// groupBy(messages,(msgItem)=>msgItem.createdAt)

export default function groupBy(array,groupingKeyfn){
   
    return array.reduce((result,item)=>{
       const groupingKey =groupingKeyfn(item);
       if(!result[groupingKey]){
           result[groupingKey]=[];
       }
       result[groupingKey].push(item);
       return result;
    },{})
}