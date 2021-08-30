import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`

export const Label = styled.label`
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.regular};
`

export const TextField = styled.input`
    border: 1px solid ${props => props.theme.colors.separator};
    border-radius: ${props => props.theme.borderRadius};
    outline: none;
    background: none;
    font-size: ${props => props.theme.fontSize.description};
    padding: 0.5rem;
`

export const HintText = styled.label`
    color: ${props => props.theme.colors.hint};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.regular};
`

export const ErrorText = styled.label`
    color: ${props => props.theme.colors.error};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.regular};
`