import React from 'react';
import { Avatar } from 'rsuite';
import { getIntialName } from '../misc/helper';

export default function ProfileAvatar({name, ...avatarProps}) {
  return (<Avatar circle {...avatarProps}>
           {getIntialName(name)}
        </Avatar>
    )

}
