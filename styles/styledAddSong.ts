import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const AddSongWrapper = styled.div`
    display: flex;
    
    ${media.desktop}{
        justify-content: space-between;
        align-items: center;
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

