import React from 'react'


//styles
import $ from './alert.module.scss';

interface AlertProps {
    message: string;
    type: string;
}

const Alert = ({ message, type }: AlertProps) => {

    const getColorClass = () => {
        switch(type){
            case 'success':
                return $.success
            case 'error':
                return $.error
        }
    }

    return (
        <div className={`${$.root} ${getColorClass()}`}>
            <p>{message}</p>
        </div>
    )
}

export default Alert
