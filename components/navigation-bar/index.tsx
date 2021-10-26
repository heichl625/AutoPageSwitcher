import React from 'react'
import Link from 'next/link';

import { NavigationBarWrapper, NavigationItem, RightWrapper } from './styledNavigationBar'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { signout } from 'redux/slice/users';
import { useCookie } from 'hooks/useCookie';

//styles
import $ from './navigationBar.module.scss';

const NavigationBar = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector((store) => store.users);
    const [cookie, setCookie] = useCookie("access_token", "");

    const handleSignout = () => {
        if (confirm("Are you sure you want to signout?")) {
            dispatch(signout())
            setCookie("")
        }
    }

    return (
        <div className={$.root}>
            <Link href="/" passHref>
                <div className={$.navigationBrand}>
                    Scroll Your Music
                </div>
            </Link>
            <Link href="/explore" passHref>
                <div className={$.navigationItem}>Explore</div>
            </Link>
            <Link href="/add-song" passHref>
                <div className={$.navigationItem}>Create Your Own</div>
            </Link>
            <div className={$.rightWrapper}>
                {user.auth && <div className={$.navigationItem}>Hi, {user.username}</div>}
                {user.auth
                    ? <div className={$.navigationItem} onClick={handleSignout}>Sign Out</div>
                    : <Link href="/signin" passHref>
                        <div className={$.navigationItem}>Sign In</div>
                    </Link>}
            </div>

        </div>
    )
}

export default NavigationBar
