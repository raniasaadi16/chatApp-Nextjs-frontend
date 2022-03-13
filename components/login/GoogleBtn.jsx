import { useRouter } from 'next/router';
import React from 'react';
import  GoogleLogin  from 'react-google-login'
import { GLogin } from '../../utils/Apicalls';

export default function GoogleBtn({seterr, signup}) {
    const router = useRouter()
    const responseSuccessGoogle = async (response) => {
        if(response){
            const data = await GLogin(response)
            if(data.user) return router.push('/')
            seterr(data)
        }else{
            seterr('something goes very wrong...!')
        }
    }
    const responseFailGoogle = (response) => {
       //console.log(response)
    }
  return <GoogleLogin className='w-full flex justify-center rounded-sm'
    clientId={process.env.NEXT_PUBLIC_GAUTH_API}
    buttonText={signup ? "Sign Up with Google" : "Login with Google"}
    onSuccess={responseSuccessGoogle}
    onFailure={responseFailGoogle}
    cookiePolicy={"http://localhost:3000"}
/>;
}
