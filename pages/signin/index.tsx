import { Wrapper, SigninForm, RegisterText } from './styledSignin';
import Axios from 'utils/axios';
import React, { useState } from 'react'
import Link from 'next/link';
import Input from 'components/input';
import Button from 'components/button';
import { AxiosResponse } from 'axios';

interface ResponseData {
    _id: string;
    email: string;
    username: string;
    access_token: string;
}

const Signin = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

        let username: string|undefined;
        let email: string|undefined;

        if(usernameOrEmail.indexOf('@') !== -1){
            email = usernameOrEmail;
        }else{
            username =usernameOrEmail;
        }

        let result = await Axios.post('/auth/signin', {
            username,
            email,
            password
        }) as AxiosResponse<ResponseData>

        if(result.data.access_token){
            
        }

    }

    return (
        <Wrapper>
            <SigninForm onSubmit={handleSignIn}>
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
