/* eslint-disable no-console */

export function getIntialName(name) {
    const SpiltName= name.toUpperCase().split(' ');
    if(SpiltName.length>1)
    {
       return (SpiltName[0][0] + SpiltName[1][0]);
    }

    return SpiltName[0][0];
}

export function TransformToArrWithId(snapVal) {
    return snapVal?  Object.keys(snapVal).map(roomId=>({...snapVal[roomId], Id:roomId})) :[];
}