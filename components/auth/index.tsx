import React, { useState, useEffect} from 'react'
import Axios from 'utils/axios';
import { useAppDispatch } from 'redux/hooks';
import { useCookie } from 'hooks/useCookie';
import { AxiosResponse } from 'axios';
import { signin } from 'redux/slice/users';

interface ResponseData {
    data: {
      username: string;
      email: string;
      _id: string;
    }
  }
  

const Auth = () => {

    const [accessToken, setAccessToken] = useCookie("access_token", "");
    const dispatch = useAppDispatch();
  
    useEffect(() => {
  
      async function auth() {
        if (accessToken) {
          if (Axios.defaults.headers) {
            Axios.defaults.headers.Authorization = `Bearer ${accessToken}`
          }
          let result = await Axios.get('/auth/whoami') as AxiosResponse<ResponseData>
  
          let { data } = result.data
  
          dispatch(signin({
            username: data.username,
            email: data.email,
            id: data._id,
            access_token: accessToken,
            auth: true
          }))
        }
      }
  
      auth()
  
    }, [accessToken])

    return null
}

export default Auth
