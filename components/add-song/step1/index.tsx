import React, { useState } from 'react'
import Input from 'components/input';
import Button from 'components/button'
import ReactPlayer from 'react-player/youtube'

//styles
import $ from './step1.module.scss';
import { Wrapper, TitleWrapper, Title, TitleDescription, FormWrapper, InputWrapper, PlayerWrapper } from './styledStep1';


interface Step1Props {
    confirmedUrl: string;
    onConfirm: (url: string) => void
}

const AddSongStep1 = ({ confirmedUrl, onConfirm }: Step1Props) => {

    const [url, setUrl] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onConfirm(url);

    }

    const handleOnUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }

    return (
        <div className={$.root}>
            <div className={$.titleWrapper}>
                <h2 className={$.title}>Step 1</h2>
                <p className={$.titleDescription}>Paste The Youtube URL Here.</p>
            </div>
            <form className={$.formWrapper} onSubmit={handleSubmit}>
                <div className={$.inputWrapper}>
                    <Input
                        type="text"
                        placeholder="Enter here..."
                        value={url}
                        name="url"
                        onChange={handleOnUrlChange} />
                </div>

                <Button label="Confirm" type="outline"/>
            </form>
            <div className={$.playerWrapper}>
                {confirmedUrl && <ReactPlayer url={confirmedUrl} width="100%" />}
            </div>
        </div>
    )
}

export default AddSongStep1
