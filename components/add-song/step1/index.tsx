import React, { useState } from 'react'
import Input from 'components/input';
import Button from 'components/button'
import ReactPlayer from 'react-player/youtube'

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
        <Wrapper>
            <TitleWrapper>
                <Title>Step 1</Title>
                <TitleDescription>Paste The Youtube URL Here.</TitleDescription>
            </TitleWrapper>
            <FormWrapper onSubmit={handleSubmit}>
                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="Enter here..."
                        value={url}
                        name="url"
                        onChange={handleOnUrlChange} />
                </InputWrapper>

                <Button label="Confirm" type="outline"/>
            </FormWrapper>
            <PlayerWrapper>
                {confirmedUrl && <ReactPlayer url={confirmedUrl} width="100%" />}
            </PlayerWrapper>
        </Wrapper>
    )
}

export default AddSongStep1
