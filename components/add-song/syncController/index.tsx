import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Document, Page } from 'react-pdf';

//component
import Button from 'components/button';


//styled component
import { Wrapper, InnerWrapper, Title, Subtitle, PlayerWrapper, ButtonWrapper, DocumentWrapper } from './styledSyncController'
import { NumberOfPages } from '../step2/styledStep2';


const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};


interface SyncControllerProps {
    url: string,
    file: string | ArrayBuffer | null | undefined;
    setPageEndTimeStamps: (currentTime: number) => void;
    handleSyncFinished: () => void;
}

const SyncController = ({ url, file, setPageEndTimeStamps, handleSyncFinished }: SyncControllerProps) => {

    const playerRef = useRef<ReactPlayer>(null)

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [videoStarted, setVideoStarted] = useState<boolean>(false);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    const handlePageFinished = () => {

        const currentTime = playerRef.current?.getCurrentTime();

        if(currentTime){
            setPageEndTimeStamps(currentTime);
        }

        if (numPages && pageNumber < numPages) {
            setPageNumber(prev => prev + 1)
        }
    }

    return (
        <Wrapper>
            <InnerWrapper>
                <PlayerWrapper>
                    <Title>Play The Music</Title>
                    <Subtitle>Follow the music and press {`"This Page Finished"`} Button when this page of document ends. </Subtitle>
                    {url && <ReactPlayer 
                        url={url} 
                        width="100%" 
                        onStart={() => setVideoStarted(true)}
                        controls={true}
                        ref={playerRef}
                    />}
                    <ButtonWrapper>
                        {pageNumber === numPages ? <Button label="Complete Sync" type="success" onClick={handleSyncFinished} /> : <Button label="This Page Finished" type={videoStarted ? "action" : 'disabled'} onClick={() => handlePageFinished()} />}
                    </ButtonWrapper>
                </PlayerWrapper>
                <DocumentWrapper>
                    {file && <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>}
                </DocumentWrapper>

            </InnerWrapper>
        </Wrapper>
    )
}

export default SyncController
