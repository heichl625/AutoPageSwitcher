import React from 'react'

import { InputWrapper, Label, TextField, HintText, ErrorText } from './styledInput';


interface InputProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string,
    placeholder: string,
    type: 'email' | 'password' | 'number' | 'text',
    name: string,
    hint?: string,
    error?: string,
}

const Input = ({ value, onChange, label, placeholder, type, hint, error }: InputProps) => {
    return (
        <InputWrapper>
            {label && <label>{label}</label> }
            <TextField type={type} placeholder={placeholder} value={value} onChange={onChange}/>
            {hint && <HintText>{hint}</HintText>}
            {error && <ErrorText>{error}</ErrorText>}
        </InputWrapper>
    )
}

export default Input
