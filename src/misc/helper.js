/* eslint-disable no-console */

export function getIntialName(name) {
    const SpiltName= name.toUpperCase().split(' ');
    if(SpiltName.length>1)
    {
       
        return (SpiltName[0][0] + SpiltName[1][0]);
    }

    return SpiltName[0][0];
}