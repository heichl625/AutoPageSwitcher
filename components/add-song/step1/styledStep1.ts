import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    /* ${media.laptop}{
        width: 45%;
        margin: 0 3rem 0 0;
    } */
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

export const FormWrapper = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const InputWrapper = styled.div`
    flex-grow: 1;
    margin-right: 1rem;
`

export const Button = styled.button`
    border: 1px solid ${props => props.theme.colors.main};
    outline: none;
    background: none;
    border-radius: ${prosp => prosp.theme.borderRadius};
    padding: 0.5rem;
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.medium};
`

export const PlayerWrapper = styled.div`
    margin: 1rem 0;
    width: 100%;
`