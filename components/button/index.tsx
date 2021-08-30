import React, { useState, useEffect } from 'react'
import { StyledButton, StyledLink } from './styledButton';

interface ButtonProps {
    label: string;
    type: 'outline' | 'action' | 'disabled' | 'delete' | 'success';
    onClick?: () => void;
    url?: string
}

const Button = ({label, type, onClick, url}: ButtonProps) => {

    const [btnClass, setBtnClass] = useState<string>('')

    useEffect(() => {
        switch(type){
            case 'success':
                setBtnClass('success');
                break;
            case 'action':
                setBtnClass('action');
                break;
            case 'delete':
                setBtnClass('delete')
                break;
            case 'disabled':
                setBtnClass('disabled');
                break;
            default:
                setBtnClass('')
                break;
        }
    }, [type])

    return (
        url ? <StyledLink className={btnClass}>
            {label}
        </StyledLink> : <StyledButton onClick={onClick}  className={btnClass} disabled={type === 'disabled'}>
            {label}
        </StyledButton>
    )
}

export default Button
