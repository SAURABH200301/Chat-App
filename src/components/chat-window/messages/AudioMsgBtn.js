import React, { useState, useCallback  } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Icon, InputGroup } from 'rsuite';
import { ReactMic } from 'react-mic';
import { storage } from '../../../misc/firebase';


export default function AudioMsgBtn({afterUpload}) {

    const {chatId} = useParams();
   const [isRecording, setIsRecording] = useState(false);
   const [isUploading, setIsUploading] = useState(false);

   const onClick= useCallback(()=>{
       setIsRecording(p=>!p);
   },[])
   const onUpload=useCallback(async(data)=>{
       setIsUploading(true);
       try {
        const snap= await storage
        .ref(`/chat/${chatId}`)
        .child(`audio_${Date.now()}.mp3`)
        .put(data.blob, { cacheControl: `public, max-age= ${3600 * 24 * 3}` })

        const file= {
            contentType: snap.metadata.contentType,
            name: snap.metadata.name,
            url: await snap.ref.getDownloadURL()
        }

        afterUpload([file])
        setIsUploading(false);
       } catch (err) {
        setIsUploading(false);
           Alert.error(err.message,4000);
       }
   },[afterUpload, chatId]);
  return( 
  <InputGroup.Button onClick={onClick} disabled={isUploading} className={isRecording? 'animate-blink': ''}>
    <Icon icon='microphone'/>
    <ReactMic
          record={isRecording}
          className="d-none"
          onStop={onUpload}
          mimeType='audio/mp3'
     />
  </InputGroup.Button>
  )
}
