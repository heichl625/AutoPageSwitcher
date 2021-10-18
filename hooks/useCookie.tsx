import { useState, useEffect } from 'react';

export const useCookie = (key: string, defaultValue: string) : [string, (value: any) => void ] => {

    const getItem = (key: string ) => document.cookie.split("; ").reduce((total: string, currentCookie: string) => {
            const item = currentCookie.split("=");
            const [storedKey, storedValue] = item;

            return key === storedKey 
                ? decodeURIComponent(storedValue) 
                : total
        }, '')
    
    const setItem = (key: string, value: any) => {
        document.cookie = `${key}=${value};`
    } 

    const removeItem = (key: string) => {
        document.cookie= `${key}= ; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }

    const getCookie = () => getItem(key) || defaultValue
    const updateCookie = (value: any) => {
        if(!value){
            setCookie(defaultValue)
            removeItem(key)
        }else{
            setCookie(value);
            setItem(key, value);
        }
    }

    const [cookie, setCookie] = useState(defaultValue)


    useEffect(() => {
        setCookie(getCookie())
    }, [])

    return [cookie, updateCookie]


}