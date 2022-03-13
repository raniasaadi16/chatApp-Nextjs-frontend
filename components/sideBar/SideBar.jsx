import React from 'react'
import Header from './Header'
import Rooms from './Rooms'
import Search from './Search'
import Bottom from './Bottom'
import Close from './close'
export default function SideBar({rooms, user, hiddBar, sethiddBar}) {
    return (
        <div className={`${hiddBar && 'hidden'} md:block w-11/12 bg-darker lg:relative absolute z-10 h-screen md:w-[324px]`}>
            <Close sethiddBar={sethiddBar}/>
            <Header/>
            <div className="mt-3 px-4">
                <Search/>
                <div className="mt-5 space-y-1">
                    {rooms.map(room => (
                         <Rooms key={room._id} room={room}/>
                    ))}
                </div>
            </div>
            <Bottom user={user}/>
        </div>
    )
}
