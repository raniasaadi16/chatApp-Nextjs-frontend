import React from 'react'
import Image from 'next/image'
import { format } from "timeago.js";

export default function Message({message, userId}) {
    //console.log(new Date(Date.now() - message.createdAt).getTime())

    return (
        <div className='flex space-x-4'>
            <div className="relative w-[42px] h-[42px]">
                <Image src={message.sender.picture} layout='fill' objectFit='cover' className='rounded'/>
            </div>
            <div className='space-y-1'>
                <div className="flex items-center space-x-3 text-gray-500">
                    <h3 className='text-md font-bold'>{userId === message.sender._id ? 'ME' : `${message.sender.firstName} ${message.sender.lastName}`}</h3>
                    <p>{format(message.createdAt)}</p>
                </div>
                <p>{message.content}</p>
            </div>
        </div>
    )
}
