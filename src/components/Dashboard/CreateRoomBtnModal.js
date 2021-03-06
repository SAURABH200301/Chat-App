import React, { useCallback, useRef, useState } from 'react';
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite';
import firebase from 'firebase/app';
import { useModalState } from '../../misc/custom-hooks';
import { database,auth } from '../../misc/firebase';

const {StringType}= Schema.Types;

const model = Schema.Model({
   name :StringType().isRequired('Chat name is Require'),
   description :StringType().isRequired('description is Require')
});

const INTIAL_FORM={
    name: '',
    description: ''
}



export default function CreateRoomBtnModal() {

    const {isOpen, open, close} = useModalState();

    const [formValue, setFormvalue]=useState(INTIAL_FORM);
    const [isLoading ,setIsLoading]=useState(false);
    const formRef =useRef();

    const onFormChange= useCallback( (value)=>{
       setFormvalue(value);
    },[])

    const onSubmit= async()=>{
    
        if(!formRef.current.check()){
            return;
        }

        setIsLoading(true);
        const newRoomData={
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admin: {
                [ auth.currentUser.uid ]: true,
            }
        }

        try {
            
            await database.ref('rooms').push(newRoomData);

            Alert.info(`${formValue.name} has been created`,4000);
            setIsLoading(false);
            setFormvalue(INTIAL_FORM);
            close();
            
        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message,4000);
        }
    }

  return (
        <div className='mt-1'>
          

          <Button block color='green' onClick={open}>
              <Icon icon="creative"/> Create new chat room
          </Button>
          <Modal show={isOpen} onHide={close}>
              <Modal.Header>
                   <Modal.Title>
                       New Chat Room
                   </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
                    <FormGroup>
                        <ControlLabel>
                           Room Name
                        </ControlLabel>
                        <FormControl name="name" placeholder="Enter chat room name. . ."/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>
                          Description
                        </ControlLabel>
                        <FormControl componentClass="textarea" rows={5} name="description" placeholder="Enter description of chat room . . ."/>
                    </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>
                        Create
                  </Button>
              </Modal.Footer>
          </Modal>
         </div>
  );
}
