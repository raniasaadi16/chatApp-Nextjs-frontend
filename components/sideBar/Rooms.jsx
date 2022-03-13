import React from 'react'
import Link from 'next/link'

export default function Rooms({room}) {
    return (
        <Link href={`/rooms/${room._id}`}>
            <div className="flex items-center py-3 px-2 cursor-pointer hover:bg-dark hover:rounded">
                <span className='px-2 py-1 bg-dark mr-3 rounded sm:text-sm'>{room.shortName}</span>
                <p className='font-bold sm:text-sm'>{room.name}</p>
            </div>
        </Link>
    )
}
