import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import Popup from '../layout/Popup';
import { useState } from 'react';
import AddChannel from '../chat/AddChannel'

export default function Header({room}) {
    const [isOpen, setisOpen] = useState(false);

    return (
        <div className='py-3 px-4 shadow-md bg-opacity-60 bg-black'>
                {room ? (
                    <Link href='/'>
                        <div className="flex justify-between items-center cursor-pointer">
                            <button className='bg-dark px-3 py-2 text-lg rounded-sm'><Icon icon="bx:bxs-left-arrow" /></button>
                            <p>All Channels</p>
                        </div>
                    </Link>
                ) : (
                    <div className="flex justify-between items-center">
                        <p>{room ? 'All Channels' : 'Channels'}</p>
                        <button className='bg-dark px-3 text-lg rounded-sm' onClick={() => setisOpen(true)}>+</button>
                        <Popup isOpen={isOpen} setisOpen={setisOpen}>
                            <AddChannel setisOpen={setisOpen} />
                        </Popup>
                    </div>
                )}    
        </div>
    )
}
