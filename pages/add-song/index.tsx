import AddSongStep1 from 'components/add-song/step1';
import AddSongStep2 from 'components/add-song/step2';
import SyncController from 'components/add-song/syncController';
import CompletedView from 'components/add-song/completedView';
import Button from 'components/button'
import React, { useState } from 'react'

import { AddSongWrapper, StickyFooter, FooterTitle } from '../../styles/styledAddSong';

interface Props {
    
}

const AddSong = (props: Props) => {

   
    const [confirmedUrl, setConfirmedUrl] = useState<string>('')
    const [file, setFile] = useState<string | ArrayBuffer | null | undefined>(null);
    const [isStep3, setIsStep3] = useState<boolean>(false);
    const [pageEndTimeStamps, setPageEndTimeStamps] = useState<number[]>([])
    const [completed, setCompleted] = useState<boolean>(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            // setFile(e.target.files[0]);
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e: ProgressEvent<FileReader>) => {
                setFile(e.target?.result)
            }
        }
        
    }

    const handleUrlConfirm = (url: string) => {
        setConfirmedUrl(url)
    }

    const handlePageFinished = (currentTime: number) => {
        setPageEndTimeStamps(prev => [...prev, currentTime])
    }

    const handleSyncFinished = () => {
        setIsStep3(false)
        setCompleted(true)
    }

    return (
        <AddSongWrapper>
            {isStep3 && <SyncController 
                url={confirmedUrl}
                file={file}
                setPageEndTimeStamps={(currentTime: number) => handlePageFinished(currentTime)}
                handleSyncFinished={() => handleSyncFinished()} />}
            {completed && <CompletedView 
                url={confirmedUrl}
                file={file}
                pageEndTimeStamps={pageEndTimeStamps}
            />}
            <AddSongStep1
                confirmedUrl={confirmedUrl}
                onConfirm={handleUrlConfirm}
            />
            <AddSongStep2
                onFileChange={handleFileChange}
                file={file}
            />
            <StickyFooter>
                <FooterTitle>Step 3</FooterTitle>
                <Button label="Sync Now" type={(confirmedUrl && file) ? "success" : "disabled"} onClick={() => setIsStep3(true)}/>
            </StickyFooter>
        </AddSongWrapper>
    )
}

export default AddSong
