import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    ${media.laptop}{
        width: 44vw;
    }
`

export const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
`

export const Title = styled.h2`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.sectionTitle};
    font-weight: ${props => props.theme.fontWeight.medium};
`

export const TitleDescription = styled.p`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.titleDescription};
    font-weight: ${props => props.theme.fontWeight.regular};
    margin-left: 1rem;
`
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`

export const NumberOfPages = styled.p`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.regular};
    margin: 0;
`


