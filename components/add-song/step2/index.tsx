import React, { useRef, useState, useEffect } from 'react'
import Button from 'components/button'
//styles
import $ from './step2.module.scss';
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
    const rootRef = useRef<HTMLDivElement | null>(null);

    const handleUploadBtnClicked = () => {
        fileInputRef.current?.click();
    }

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    return (
        <div className={$.root} ref={rootRef}>
            <div className={$.titleWrapper}>
                <h2 className={$.title}>Step 2</h2>
                <p className={$.titleDescription}>Upload your musicsheet PDF</p>
            </div>
            <input type="file" accept=".pdf" hidden ref={fileInputRef} onChange={onFileChange} />
            <div className={$.buttonWrapper}>
                <Button label="Upload File" type="outline" onClick={() => handleUploadBtnClicked()} />
                {file && <p className={$.numberOfPage}>{numPages} Pages in Total</p> }
            </div>
            {file && <div className={$.pdfWrapper}>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
            >
                <Page pageNumber={pageNumber} width={rootRef.current?.scrollWidth}/>
            </Document>
            </div> }
            
        </div>
    )
}

export default AddSongStep2
