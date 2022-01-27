import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import { database } from '../../misc/firebase';
import { GetUserUpdates } from '../../misc/helper';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProviderBlock from './ProviderBlock';

export default function Dashboard({onSignOut}) {
    const {profile}= useProfile();

    // eslint-disable-next-line no-unused-vars
    const onSave = async( newData ) => {
         
        try {
             const updates = await GetUserUpdates(profile.uid, 'name', newData, database);

             await database.ref().update(updates);

             Alert.info('Nickname is Updated ',4000);
        } catch (err) {
            Alert.info(err.message,4000);
            
        }
    }
    return (
        <>
        <Drawer.Header>
            <Drawer.Title>
            Dashboard
            </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
             <h3>hey, {profile.name }</h3>
             <ProviderBlock/>
             <Divider/>
             <EditableInput
               name='Nickname'
               initialInput={profile.name}
               onSave={onSave}
               label={<h6 className='mb-2'>Nickname</h6>}
             />
             <AvatarUploadBtn/>
        </Drawer.Body>

        <Drawer.Footer>
          <Button block color='red' onClick={onSignOut} >
               Sign Out
          </Button>
        </Drawer.Footer>
        </>
    )
}
