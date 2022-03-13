import { useRouter } from 'next/router';
import React from 'react';
import FacebookLogin from 'react-facebook-login'
import { FbLogin } from '../../utils/Apicalls';
import { Icon } from '@iconify/react';

export default function FacebookBtn({seterr, signup}) {
    const router = useRouter()
    const responseFacebook = async (response) => {
        if(response){
            const data = await FbLogin({accessToken: response.accessToken, userID: response.userID})
            if(data.user) return router.push('/')
            seterr(data)
        }else{
            seterr('something goes very wrong...!')
        }        
    }

  return <FacebookLogin
    appId={process.env.NEXT_PUBLIC_FBAUTH_API}
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="py-2 bg-blue-900 w-full rounded-sm mt-2 flex justify-center items-center"
    textButton={signup ? 'Signup with Facebook' : 'Login with Facebook'}
    icon={<Icon icon="bi:facebook" className='mr-3 text-lg'/>} />
}
