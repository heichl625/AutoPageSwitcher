import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Document, Page } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//component
import Button from 'components/button';


//styled component
import { Wrapper, InnerWrapper, Title, Subtitle, PlayerWrapper, ButtonWrapper, DocumentWrapper, CloseBtnWrapper } from './styledSyncController'
import { NumberOfPages } from '../step2/styledStep2';
import { $CombinedState } from 'redux';
import $ from './syncController.module.scss';
import AudioPlayer from 'components/audio-player';



const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};


interface SyncControllerProps {
    url: string,
    file: string | ArrayBuffer | null | undefined;
    song_name: string;
    artist_name: string;
    setPageEndTimeStamps: (currentTime: number) => void;
    handleSyncFinished: () => void;
    onClose: () => void;
}

const SyncController = ({ url, file, song_name, artist_name, setPageEndTimeStamps, handleSyncFinished, onClose }: SyncControllerProps) => {

    const playerRef = useRef<ReactPlayer>(null)
    const rootRef = useRef<HTMLDivElement | null>(null)

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [videoStarted, setVideoStarted] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    const handlePageFinished = () => {

        const currentTime = playerRef.current?.getCurrentTime();

        if (currentTime) {
            setPageEndTimeStamps(currentTime);
        }

        if (numPages && pageNumber < numPages) {
            setPageNumber(prev => prev + 1)
        }
    }

    const handleReady = () => {
        setCurrentTime(playerRef.current?.getCurrentTime() ?? 0)
        setDuration(playerRef.current?.getDuration() ?? 0)
    }

    const getCurrentTime = (playedSeconds: number) => {
        setCurrentTime(playedSeconds);
    }

    const handleTimeChange = (value: number) => {
        playerRef.current?.seekTo(value, 'seconds')
    }

    return (
        <div className={$.root} ref={rootRef}>
            <div className={$.playerWrapper}>
                <h3 className={$.songName}>{song_name} | <span className={$.artistName}>{artist_name}</span></h3>
                <p className={$.instruction}>Play The Music and press "This Page is Finished" button when the page of the document ends</p>
                {url && <AudioPlayer
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    togglePlayingState={() => setIsPlaying(prev => !prev)}
                    onChange={(value: number) => handleTimeChange(value)}
                />}
                <ButtonWrapper>
                    {pageNumber === numPages ? <Button label="Complete Sync" type="success" onClick={handleSyncFinished} /> : <Button label="This Page Finished" type={videoStarted ? "action" : 'disabled'} onClick={() => handlePageFinished()} />}
                </ButtonWrapper>
                {url && <div className={$.videoWrapper}>
                    <ReactPlayer
                    url={url}
                    width="100%"
                    onStart={() => setVideoStarted(true)}
                    onPause={() => setIsPlaying(false)}
                    onReady={() => handleReady()}
                    onEnded={() => setIsPlaying(false)}
                    onProgress={({ playedSeconds }) => getCurrentTime(playedSeconds)}
                    controls={true}
                    ref={playerRef}
                    playing={isPlaying}
                />
                </div>}

            </div>
            <div className={$.documentWrapper}>
                {file && <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                >
                    <Page pageNumber={pageNumber} height={rootRef.current?.scrollHeight} />
                </Document>}
            </div>
        </div>
    )
}

export default SyncController
