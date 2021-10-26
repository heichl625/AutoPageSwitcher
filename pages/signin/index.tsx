import { Wrapper, SigninForm, RegisterText, ErrorText } from './styledSignin';
import Axios from 'utils/axios';
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from 'components/input';
import Button from 'components/button';

import axios, { AxiosResponse } from 'axios';
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

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cookie, updateCookie] = useCookie("access_token", "");
    const [error, setError] = useState<string>("")

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        let username: string|undefined;
        let email: string|undefined;

        if(usernameOrEmail.indexOf('@') !== -1){
            email = usernameOrEmail;
        }else{
            username =usernameOrEmail;
        }

        try{
            
            let result = await Axios.post('/auth/signin', {
                username,
                email,
                password
            })as AxiosResponse<ResponseData>

            let { data } = result.data

            if(data.access_token){
                console.log('signed in')
                updateCookie(data.access_token);
                dispatch(signin({
                    id: data._id,
                    email: data.email,
                    username: data.username,
                    access_token: data.access_token,
                    auth: true
                }))
                if(router.query['origin'] === 'add-song'){
                    router.push('/add-song')
                }else{
                    router.back();
                }
            }
        }catch(err: any){
             setError(err.response.data.message[0] ?? err.response.data.message);
        }

        

    }

    return (
        <Wrapper>
            <SigninForm onSubmit={handleSignIn}>
                <h1>Sign In</h1>
                <Input 
                    placeholder=""
                    label="Email / Username"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    type="text"
                    name="usernameOrEmail"
                />
                <Input 
                    placeholder=""
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button 
                    label="Sign In"
                    type="action"
                    onClick={()=>{}}
                />
                <RegisterText>
                    Don't have an account? <Link href="/signup">
                        Sign up 
                    </Link> now.
                </RegisterText>
            </SigninForm>
        </Wrapper>
    )
}

export default Signin
