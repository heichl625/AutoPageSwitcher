import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const AddSongWrapper = styled.div`
    display: grid;
    
    ${media.laptop}{
        grid-template-areas: 
            'title title'
            'subtitle subtitle'
            'step1 step2';
        grid-gap: 10px;
    }
`

export const StickyFooter = styled.div`

    ${media.laptop}{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid ${props => props.theme.colors.separator};
        padding: 1rem 10%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        background-color: ${props => props.theme.colors.secondary};

        /* & button {
            font-size: ${props => props.theme.fontSize.titleDescription};
        } */
    }
   
`

export const FooterTitle = styled.p`
    font-size: ${props => props.theme.fontSize.sectionTitle};
    font-weight: ${props => props.theme.fontWeight.medium};
    color: ${props => props.theme.colors.main};
    margin: 0;
    margin-right: 1rem;
`
export const TitleInput = styled.input`
    font-size: 2.5rem;
    padding: 0.5rem 0;
    border: none;
    outline: none;
    grid-area: title;
`

export const SingerInput = styled.input`
    grid-area: subtitle;
    font-size: 1.5rem;
    padding: 0.5rem 0;
    margin-top: 1rem;
    border: none;
    outline: none;
`

export const Step1Wrapper = styled.div`
    grid-area: step1;
`

export const Step2Wrapper = styled.div`
    grid-area: step2;
`