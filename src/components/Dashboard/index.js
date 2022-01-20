import React from 'react'
import { Button, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'

export default function Dashboard({onSignOut}) {
    const {profile}= useProfile();
    return (
        <>
        <Drawer.Header>
            <Drawer.Title>
            Dashboard
            </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
             <h3>hey, {profile.name }</h3>
        </Drawer.Body>

        <Drawer.Footer>
          <Button block color='red' onClick={onSignOut} >
               Sign Out
          </Button>
        </Drawer.Footer>
        </>
    )
}
