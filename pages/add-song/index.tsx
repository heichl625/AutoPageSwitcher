import AddSongStep1 from 'components/add-song/step1';
import AddSongStep2 from 'components/add-song/step2';
import SyncController from 'components/add-song/syncController';
import CompletedView from 'components/add-song/completedView';
import Button from 'components/button'
import React, { useState } from 'react'

import { AddSongWrapper, StickyFooter, FooterTitle, TitleInput, Step1Wrapper, Step2Wrapper, SingerInput } from '../../styles/styledAddSong';
//styles
import $ from './addSong.module.scss';

//redux
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { syncSong } from 'redux/slice/song';
import Input from 'components/input';

const AddSong = () => {

    const dispatch = useAppDispatch();

    const [confirmedUrl, setConfirmedUrl] = useState<string>('')
    const [file, setFile] = useState<string | ArrayBuffer | null | undefined>(null);
    const [isStep3, setIsStep3] = useState<boolean>(false);
    const [pageEndTimeStamps, setPageEndTimeStamps] = useState<number[]>([])
    const [completed, setCompleted] = useState<boolean>(false);
    const [songName, setSongName] = useState<string>("");
    const [artistName, setArtistName] = useState<string>("");


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
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
        dispatch(syncSong({
            youtube_url: confirmedUrl,
            document: file,
            timestamps: pageEndTimeStamps
        }))
    }

    return (
        <div className={$.root}>
            {isStep3 && <SyncController
                url={confirmedUrl}
                file={file}
                song_name={songName}
                artist_name={artistName}
                setPageEndTimeStamps={(currentTime: number) => handlePageFinished(currentTime)}
                handleSyncFinished={() => handleSyncFinished()}
                onClose={() => setIsStep3(false)}
            />}
            {completed && <CompletedView
                url={confirmedUrl}
                file={file}
                pageEndTimeStamps={pageEndTimeStamps}
            />}
            {!isStep3 && <div className={$.initialStep}>
                <input
                    placeholder="Enter the song name here..."
                    className={$.titleInput}
                    value={songName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSongName(e.target.value)}
                />
                <input
                    placeholder="Enter the artist name here..."
                    className={$.singerInput}
                    value={artistName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtistName(e.target.value)}
                />
                <div className={$.step1Wrapper}>
                    <AddSongStep1
                        confirmedUrl={confirmedUrl}
                        onConfirm={handleUrlConfirm}
                    />
                </div>
                <div className={$.step2Wrapper}>
                    <AddSongStep2
                        onFileChange={handleFileChange}
                        file={file}
                    />
                </div>
                <div className={$.stickyFooter}>
                    <p className={$.footerTitle}>Step 3</p>
                    <Button label="Sync Now" type={(confirmedUrl && file) ? "success" : "disabled"} onClick={() => setIsStep3(true)} />
                </div>
            </div>}

        </div>
    )
}

export default AddSong
