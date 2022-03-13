import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { register } from '../utils/Apicalls';
import { useRouter } from 'next/router';
import GoogleBtn from '../components/login/GoogleBtn'
import FacebookBtn from '../components/login/FacebookBtn'
import { useCustomErr } from '../utils/customHooks';
import Link from 'next/link';

export default function Signup() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [err, seterr] = useCustomErr('')
   const router = useRouter()
    const handleSubmit = async e =>{
        e.preventDefault();
        const data =  await register({firstName, lastName, email, password, passwordConfirm})
        if(data.user){
            router.push('/')
        }else{
            seterr(data)
        }

    }


    return (
        <div className="flex items-center h-screen justify-center py-4">
            <div className='py-3 px-4 text-white my-auto block max-w-sm sm:border sm:border-gray-500 sm:rounded-2xl sm:px-12 sm:py-8'>
                <p className='text-sm font-bold'>Chat_App</p>
                {err && <p className='text-lg p-2 rounded-md my-2 bg-red-500'>{err}</p>}
                <div className='mt-4'>
                    <h4 className='text-lg font-semibold'>Join thousands of learners from around the world</h4>
                    <p className="mt-3 text-md">Master web development by making real-life projects. There are multiple paths of you to choose</p>
                </div>
                <div className="mt-9">
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className="relative">
                            <Icon icon="bxs:user-circle" className='absolute top-1/2 -translate-y-1/2 left-2 text-2xl text-gray-500' />
                            <input type="text" placeholder='First Name' className='input' value={firstName} onChange={e => setfirstName(e.target.value)} required/>
                        </div>
                       <div className="relative">
                            <Icon icon="carbon:user-avatar-filled-alt" className='absolute top-1/2 -translate-y-1/2 left-2 text-2xl text-gray-500' />
                            <input type="text" placeholder='Last Name' className='input' value={lastName} onChange={e => setlastName(e.target.value)} required/>
                        </div>
                        <div className="relative">
                            <Icon icon="ic:baseline-email" className='absolute top-1/2 -translate-y-1/2 left-2 text-2xl text-gray-500' />
                            <input type="email" placeholder='Email' className='input' value={email} onChange={e => setemail(e.target.value)} required/>
                        </div>
                        <div className="relative">
                            <Icon icon="ri:lock-password-fill" className='absolute top-1/2 -translate-y-1/2 left-2 text-2xl text-gray-500' />
                            <input type="password" placeholder='Password' className='input' value={password} onChange={e => setpassword(e.target.value)} required/>
                        </div>
                        <div className="relative">
                            <Icon icon="ri:lock-password-fill" className='absolute top-1/2 -translate-y-1/2 left-2 text-2xl text-gray-500' />
                            <input type="password" placeholder='Confirm Password' className='input' value={passwordConfirm} onChange={e => setpasswordConfirm(e.target.value)} required/>
                        </div>
                        <button type='submit' className='p-2 text-center bg-blue-600 w-full rounded-md'>Join Us</button>
                    </form>
                </div>
                <div className="mt-4">
                    <p className='text-center text-gray-500 text-sm'>Already have an account? <Link href='/login'><a className='text-blue-500'>Login</a></Link></p>
                </div>
                <div className="mt-4">
                    <p className='text-center text-gray-500 text-sm'>Or continue with social profile</p>
                    <div className="mt-3">
                        <GoogleBtn seterr={seterr} signup={true}/>
                        <FacebookBtn seterr={seterr} signup={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

