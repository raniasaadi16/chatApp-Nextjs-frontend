import React, { useEffect } from 'react'
import Header from './Header'
import Image from 'next/image'
import Bottom from './Bottom'
import Close from './Close'

export default function RoomBar({room, onlineUsers, user, hiddBar, sethiddBar}) {

    const checkOnlineUsers = (users, member) => {
        return users.some(user => user.userId === member._id)
    }
    return (
        <div className={`${hiddBar && 'hidden'} md:block w-11/12 bg-darker lg:sticky top-0 absolute z-10 h-screen md:w-[324px]`}>
            <Close sethiddBar={sethiddBar}/>
            <Header room={true}/>
            <div className="mt-3 px-4">
                <div className="mt-5 space-y-9">
                    <div className='space-y-2'>
                        <h2 className="text-lg font-bold">{room.name.toUpperCase()}</h2>
                        <p>{room.description}</p>
                    </div>
                    <div className='space-y-3'>
                        <h2 className="text-lg font-bold">MEMBERS</h2>
                        <div>
                            {room.members.map(member => (
                                <div key={member._id} className='flex space-x-4 items-center my-3'>
                                    <div className='relative w-[42px] h-[42px]'>
                                        <Image src={member.picture} layout='fill' className='rounded' objectFit='cover' />
                                        {checkOnlineUsers(onlineUsers, member) && (
                                            <div className='h-[10px] w-[10px] bg-green-700 absolute rounded-full right-0 top-[-3px]'></div>
                                        )}
                                    </div>
                                    <p>{member.firstName} {member.lastName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Bottom user={user}/>
        </div>
    )
}
