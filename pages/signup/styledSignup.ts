import styled from 'styled-components';
import { media } from 'styles/breakpoints';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.secondary};

    ${media.laptop}{
        padding: 1rem 10%;
    };
`

export const SignupForm = styled.form`
    border: 1px solid ${props => props.theme.colors.separator};
    border-radius: 0.5rem;
    padding: 1rem;
    width: 60%;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;

    & > div{
        margin: 0.5rem 0;
    }

    & > button {
        margin: 1rem 0;
    }
`
export const RegisterText = styled.p`
    font-size: 0.875rem;
    color: ${props => props.theme.colors.hint};
    text-align: center;

    & > a{
        color: ${props => props.theme.colors.highlighted};
        text-decoration: underline;
    }
`
export const ErrorText = styled.p`
    color: ${props => props.theme.colors.error};
    font-size: 1.125rem;
    text-align: center;
`