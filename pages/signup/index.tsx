import { Wrapper, SignupForm, ErrorText } from './styledSignup';
import Axios from 'utils/axios';
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from 'components/input';
import Button from 'components/button';
import { AxiosResponse } from 'axios';
import { useCookie } from 'hooks/useCookie';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { signin } from 'redux/slice/users';

interface ResponseData {

    data: {
        _id: string;
        email: string;
        username: string;
        access_token: string;
    }
    
}

const Signin = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfrimPassword] = useState<string>("")
    const [error, setError] = useState<string>("");

    const [cookie, updateCookie] = useCookie("access_token", "");

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        try{
            let result = await Axios.post('/auth/signup', {
                username,
                email,
                password,
                confirmPassword
            }) as AxiosResponse<ResponseData>
    
            let { data } = result.data
    
            if(data.access_token){
                updateCookie(data.access_token);
                dispatch(signin({
                    id: data._id,
                    email: data.email,
                    username: data.username,
                    access_token: data.access_token,
                    auth: true
                }))
                router.push('/');
            }
        }catch(err){
            console.log(err.response)
            if(typeof err.response.data.message === 'string'){
                setError(err.response.data.message)
            }else{
                setError(err.response.data.message[0])
            }
        }

        

    }

    return (
        <Wrapper>
            <SignupForm onSubmit={handleSignUp}>
                <h1>Become a member</h1>
                <Input 
                    placeholder=""
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="email"
                />
                 <Input 
                    placeholder=""
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                />
                <Input 
                    placeholder=""
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                />
                <Input 
                    placeholder=""
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfrimPassword(e.target.value)}
                    type="password"
                    name="confirmPassword"
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button 
                    label="Sign Up"
                    type="action"
                    onClick={()=>{}}
                />
            </SignupForm>
        </Wrapper>
    )
}

export default Signin
