import React from 'react'
import Link from 'next/link';

import { NavigationBarWrapper, NavigationItem, RightWrapper } from './styledNavigationBar'

const NavigationBar = () => {
    return (
        <NavigationBarWrapper>
            <Link href="/add-song" passHref>
                <NavigationItem>Add Song</NavigationItem>
            </Link>
            <RightWrapper>
                <Link href="/signin" passHref>
                    <NavigationItem>Sign In</NavigationItem>
                </Link>
            </RightWrapper>

        </NavigationBarWrapper>
    )
}

export default NavigationBar
