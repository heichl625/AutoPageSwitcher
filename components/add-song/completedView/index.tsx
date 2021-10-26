import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Document, Page } from 'react-pdf';

//component
import Button from 'components/button';

//styled compoenent
import { Wrapper, InnerWrapper, Title, Subtitle, PlayerWrapper, DocumentWrapper, BtnWrapper } from './styledCompletedView'
import $ from './completedView.module.scss';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import AudioPlayer from 'components/audio-player';
import { useRouter } from 'next/router';
import Axios from 'utils/axios';
import { AxiosResponse } from 'axios';
import Alert from 'components/alert';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

interface CopmletedViewProps {
    pageEndTimeStamps: number[];
    url: string;
    file: string | ArrayBuffer | null | undefined;
    song_name: string;
    artist_name: string;
    tab_type: string;
    request_file: File;
}

interface ResponseData {

    data: {
        _id: string;
        artist_name: string;
        name: string;
        created_at: string;
        file_url: string;
        tab_type: string;
        timestamps: number[];
        youtube_url: string;
        updated_at: string;
    }
    
}

const CopmletedView = ({ pageEndTimeStamps, url, file, song_name, artist_name, tab_type, request_file }: CopmletedViewProps) => {

    const user = useAppSelector(store => store.users);

    const router = useRouter();

    const playerRef = useRef<ReactPlayer>(null)
    const rootRef = useRef<HTMLDivElement | null>(null);

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(100);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [publishPopup, setPulbishPopup] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [failed, setFailed] = useState<string>("");
    const [showAlert, setShowAlert] = useState<"" | "success" | "error">("");

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    const handleProgress = (state: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }) => {
        setCurrentTime(state.playedSeconds);
        let lastTimestamp = pageEndTimeStamps.filter(time => state.playedSeconds > time).pop();

        if (lastTimestamp) {
            const index: number | undefined = pageEndTimeStamps.findIndex(time => Math.floor(time) == Math.floor(lastTimestamp!))
            if (index !== undefined) {
                setPageNumber(index + 2)
            }
        } else {
            setPageNumber(1)
        }

    }

    const handleScale = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScale(parseInt(e.target.value));
    }

    const handleReady = () => {
        setCurrentTime(playerRef.current?.getCurrentTime() ?? 0)
        setDuration(playerRef.current?.getDuration() ?? 0)
    }

    const handleTimeChange = (value: number) => {
        setCurrentTime(value);
        playerRef.current?.seekTo(value, 'seconds')
    }

    const handleLaterUse = () => {
        if(!user.auth){
            router.push('/signin?origin=add-song')
        }else{
            setPulbishPopup(true)
        }
    }

    const saveSong =  async (share: boolean) => {
        setPulbishPopup(false)
        console.log({request_file})

        const formData = new FormData();
        formData.append('name', song_name);
        formData.append('youtube_url', url);
        formData.append('file', request_file);
        formData.append('artist_name', artist_name);
        formData.append('publish', `${share}`);
        formData.append('tab_type', tab_type)
        pageEndTimeStamps.forEach(timestamp => {
            formData.append('timestamps[]', `${timestamp}`)
        })

        try{
            let song = await Axios.post('/song/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }) as AxiosResponse<ResponseData>

            if(song){
                let { data } = song.data;
                if(data._id){
                    setSaved(true);
                    setShowAlert("success")
                }
            }
        }catch(err: any){
            console.log(err.response);
            setFailed( err.response.data.message[0] ?? err.response.data.message);
            setShowAlert("error")
        }

    }

    useEffect(() => {

        const resetAlert = () => {
            setShowAlert("")
        }

        if(showAlert){
            const timer = setTimeout(resetAlert, 5000)

            return () => {
                clearTimeout(timer)
            }
        }
        
    }, [showAlert])

    return (
        <div className={$.root} ref={rootRef}>
            {(showAlert === "success") && <Alert message="Song saved" type="success"/>}
            {showAlert === "error" && <Alert message={failed} type="error" />}
            {publishPopup && <div className={$.publishPopupWrapper}>
                <div className={$.publishPopupCard}>
                    <p className={$.publishEnquiry}>Do you want to share your music sheet with others?</p>
                    <div className={$.publishButtonWrapper}>
                        <Button
                            label="Yes"
                            type="success"
                            onClick={() => saveSong(true)}
                        />
                        <Button
                            label="No"
                            type="outline"
                            onClick={() => saveSong(false)}
                        />
                    </div>
                </div>
            </div> }
            <div className={$.playerWrapper}>
                <h1 className={$.title}>Sync Finished!</h1>
                <h3 className={$.songName}>{song_name} | <span className={$.artistName}>{artist_name}</span></h3>
                <p className={$.instruction}>Follow the music and play your instrument. The music sheet will automatically change along with the music</p>
                {url && <AudioPlayer
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    togglePlayingState={() => setIsPlaying(prev => !prev)}
                    onChange={(value: number) => handleTimeChange(value)}
                />}
                <div className={$.buttonWrapper}>
                    <Button
                        label={saved ? "Saved" : "Save for Later Use"}
                        onClick={handleLaterUse}
                        type={saved ? "disabled" : "action"}
                    />
                </div>
                
                {url && <div className={$.videoWrapper}>
                    <ReactPlayer
                    url={url}
                    width="100%"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onReady={() => handleReady()}
                    onEnded={() => setIsPlaying(false)}
                    onProgress={handleProgress}
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

export default CopmletedView
