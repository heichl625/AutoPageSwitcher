import React from 'react'
import Link from 'next/link';

import { NavigationBarWrapper, NavigationItem, RightWrapper } from './styledNavigationBar'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { signout } from 'redux/slice/users';
import { useCookie } from 'hooks/useCookie';

const NavigationBar = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector((store) => store.users);
    const [cookie, setCookie] = useCookie("access_token", "");

    const handleSignout = () => {
        if(confirm("Are you sure you want to signout?")){
            dispatch(signout())
            setCookie("")
        }
    }

    return (
        <NavigationBarWrapper>
            <Link href="/add-song" passHref>
                <NavigationItem>Add Song</NavigationItem>
            </Link>
            <RightWrapper>
                {user.auth && <NavigationItem>Hi, {user.username}</NavigationItem>}
                {user.auth 
                    ? <NavigationItem onClick={handleSignout}>Sign Out</NavigationItem>
                    : <Link href="/signin" passHref>
                        <NavigationItem>Sign In</NavigationItem>
                    </Link>}
            </RightWrapper>

        </NavigationBarWrapper>
    )
}

export default NavigationBar
