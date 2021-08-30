import React, { useRef, useState, useEffect } from 'react'
import Button from 'components/button'
import { Wrapper, TitleWrapper, Title, TitleDescription, ButtonWrapper, NumberOfPages } from './styledStep2'
import { Document, Page } from 'react-pdf';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

interface Step2Props {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: string | ArrayBuffer | null | undefined;
}

const AddSongStep2 = ({ onFileChange, file }: Step2Props) => {

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [numPages, setNumPages] = useState<number|null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const handleUploadBtnClicked = () => {
        fileInputRef.current?.click();
    }

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>Step 2</Title>
                <TitleDescription>Upload your musicsheet PDF</TitleDescription>
            </TitleWrapper>
            <input type="file" accept=".pdf" hidden ref={fileInputRef} onChange={onFileChange} />
            <ButtonWrapper>
                <Button label="Upload File" type="outline" onClick={() => handleUploadBtnClicked()} />
                {file && <NumberOfPages>{numPages} Pages in Total</NumberOfPages> }
            </ButtonWrapper>
            {file && <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
            >
                <Page pageNumber={pageNumber}/>
            </Document> }
            
        </Wrapper>
    )
}

export default AddSongStep2
