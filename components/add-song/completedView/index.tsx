import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Document, Page } from 'react-pdf';

//component
import Button from 'components/button';

//styled compoenent
import { Wrapper, InnerWrapper, Title, Subtitle, PlayerWrapper, DocumentWrapper } from './styledCompletedView'

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

interface CopmletedViewProps {
    pageEndTimeStamps: number[];
    url: string;
    file: string | ArrayBuffer | null | undefined;
}

const CopmletedView = ({ pageEndTimeStamps, url, file }: CopmletedViewProps) => {

    const playerRef = useRef<ReactPlayer>(null)

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    const handleProgress = (state: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }) => {
        let lastTimestamp = pageEndTimeStamps.filter(time => state.playedSeconds > time).pop();

        if(lastTimestamp){
            const index:number|undefined = pageEndTimeStamps.findIndex(time => Math.floor(time) == Math.floor(lastTimestamp!))
            if(index !== undefined){
                setPageNumber(index+2)
            }
        }else{
            setPageNumber(1)
        }
       
    }

    return (
        <Wrapper>
            <InnerWrapper>

                <PlayerWrapper>
                    <Title>Follow the Music And Play</Title>
                    <Subtitle>The document will now turn pages automatically.</Subtitle>
                    {url && <ReactPlayer
                        url={url}
                        width="100%"
                        onProgress={handleProgress}
                        controls={true}
                        ref={playerRef}
                    />}
                </PlayerWrapper>
                <DocumentWrapper>
                    {file && <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                    >
                        <Page
                            pageNumber={pageNumber}
                            height={700}
                         />
                    </Document>}
                </DocumentWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

export default CopmletedView
