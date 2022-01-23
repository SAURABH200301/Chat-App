import React, { useState, useRef } from 'react'
import { Modal, Button, Alert } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import ProfileAvatar from '../ProfileAvatar';
import { useProfile } from '../../context/profile.context';
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';



const fileInputType = ".png, .jpeg, .jpg";

const acceptedFiles = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = (file) => acceptedFiles.includes(file.type);

const getBlob = (canvas) => new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
        if (blob) {
            resolve(blob);
        } else {
            reject(new Error('File Process error'));
        }
    })
})

export default function AvatarUploadBtn() {

    const { isOpen, open, close } = useModalState();

    const { profile } = useProfile();

    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const AvatarEditorRef = useRef();

    const onFileInputChange = (ev) => {

        const currFiles = ev.target.files;
        if (currFiles.length === 1) {
            const file = currFiles[0];

            if (isValidFile(file)) {

                setImg(file);
                open();
            } else {
                Alert.warning(`Wrong file type: ${file.type}`, 4000);
            }
        }
    }

    const onUploadClick = async () => {
        const canvas = AvatarEditorRef.current.getImageScaledToCanvas();

        setIsLoading(true);
        try {
            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');
            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public,max-age=${3600 * 24 * 3}`
            });

            const downloadURL = await uploadAvatarResult.ref.getDownloadURL();

            const userAvatarUrl = database.ref(`/profile/${profile.uid}`).child('avatar');

            await userAvatarUrl.set(downloadURL);

            setIsLoading(false);
            Alert.info('Avatar has been Uploaded', 4000);
        } catch (err) {
            setIsLoading(false);
            Alert.warning(err.message, 4000);
        }

    }

    return (
        <div className='mt-3 text-center'>
            <ProfileAvatar name={profile.name} src={profile.avatar} className="width-200 height-200 img-fullsize font-huge" />
            <div>
                <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
                    Select new Avatar
                    <input
                        id='avatar-upload'
                        type='file'
                        className='d-none'
                        accept={fileInputType}
                        onChange={onFileInputChange}
                    />
                </label>

                <Modal show={isOpen} onHide={close}>

                    <Modal.Header>
                        <Modal.Title>
                            Adjust and Upload New Avatar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center  align-items-center h-100'>
                            {img &&
                                <AvatarEditor
                                    ref={AvatarEditorRef}
                                    image={img}
                                    width={200}
                                    height={200}
                                    border={10}
                                    borderRadius={100}
                                    rotate={0}
                                />
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance='ghost' onClick={onUploadClick} disabled={isLoading}>
                            Upload New Avatar
                        </Button>

                    </Modal.Footer>

                </Modal>
            </div>
        </div>
    )
}

