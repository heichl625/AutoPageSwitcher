import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const NavigationBarWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colors.separator};
    background-color: ${props => props.theme.colors.secondary};

    ${media.laptop}{
        padding: 1rem 10%;
    };
`

export const NavigationItem = styled.a`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.navigationItem};
    cursor: pointer;
    margin-left: 1rem;
`

export const RightWrapper = styled.div`
    display: none;

    ${media.laptop}{
        position: absolute;
        right: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    };
`