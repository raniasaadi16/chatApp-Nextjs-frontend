import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { logout } from "../../utils/Apicalls" 
export default function Bottom({user}) { 
    const router = useRouter()
    const logoutHandell = async e => {
        e.preventDefault
        await logout()
        router.push('/login')
    }
    return (
        <div className='bottom-0 absolute px-4 py-4 w-full'>
            <Link href='/profile'>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="relative w-[42px] h-[42px]">
                        <Image src={user.picture} layout='fill' objectFit='cover' className='rounded'/>
                    </div>
                    <h3 className='ml-4 text-md font-bold'>{user.firstName} {user.lastName}</h3>
                </div>
            </Link>
            <div className="mt-3">
                <button className='py-2 font-bold bg-blue-600 w-full rounded-sm' onClick={logoutHandell}>LOGOUT</button>
            </div>
        </div>
    )
}
