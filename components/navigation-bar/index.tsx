import React from 'react'
import Link from 'next/link';

import { NavigationBarWrapper, NavigationItem } from './styledNavigationBar'

const NavigationBar = () => {
    return (
        <NavigationBarWrapper>
            <Link href="/add-song" passHref>
                <NavigationItem>Add Song</NavigationItem>
            </Link>
        </NavigationBarWrapper>
    )
}

export default NavigationBar
