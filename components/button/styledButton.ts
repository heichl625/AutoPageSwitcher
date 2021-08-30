import styled from 'styled-components';
import { media } from 'styles/breakpoints';


export const StyledButton = styled.button`
    border: 1px solid ${props => props.theme.colors.main};
    outline: none;
    background: none;
    border-radius: ${prosp => prosp.theme.borderRadius};
    padding: 0.5rem;
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.medium};
    cursor: pointer;

    &.success{
        background-color: ${props => props.theme.colors.highlighted};
        border: none;
        color: ${props => props.theme.colors.secondary}
    }

    &.action{
        background-color: ${props => props.theme.colors.main};
        border: none;
        color: ${props => props.theme.colors.secondary}
    }

    &.disabled{
        background-color: ${props => props.theme.colors.separator};
        border: none;
        color: ${props => props.theme.colors.hint}
    }
`

export const StyledLink = styled.a`
    border: 1px solid ${props => props.theme.colors.main};
    outline: none;
    background: none;
    border-radius: ${prosp => prosp.theme.borderRadius};
    padding: 0.5rem;
    color: ${props => props.theme.colors.main};
    font-size: ${props => props.theme.fontSize.description};
    font-weight: ${props => props.theme.fontWeight.medium};
`