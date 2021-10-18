import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: ${props => props.theme.colors.darkTransparentBackground};
    z-index: 3;
`

export const InnerWrapper = styled.div`
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 1.25rem;
    width: 95vw;
    height: 95vh;
    margin: auto;
    display: flex;
    padding: 5rem 10%;
    justify-content: space-between;
`

export const Title = styled.h2`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.sectionTitle};
    font-weight: ${props => props.theme.fontWeight.medium};
    margin: 0.5rem 0;
`

export const Subtitle = styled.p`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.titleDescription};
    font-weight: ${props => props.theme.fontWeight.regular};
`

export const PlayerWrapper = styled.div`
    margin: 1rem 0;
    width: 40%;
`

export const ButtonWrapper = styled.div`
    margin-top: 1rem;
`

export const DocumentWrapper = styled.div`
    max-height: 100%;
    overflow: scroll;
`

export const BtnWrapper = styled.div`
    margin-top: 2rem;
`


