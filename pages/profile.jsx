import React from 'react'
import SideBar from '../components/sideBar/SideBar'
import { checkAuth, getAllRooms } from '../utils/Apicalls'

export default function Profile({rooms,user}) {
    return (
        <div className="md:flex">
            <SideBar rooms={rooms} user={user}/>
            <div className="md:ml-[324px] lg:ml-0 md:flex-auto">
                <div className="py-3 px-5 shadow-md">
                    <p>Edit Profile</p>
                    <div className="mt-3">
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-center">
                        <h3 className="text-lg">COMMING SOON</h3>    
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context){
    const data = await checkAuth(context.req.cookies)
    const rooms = await getAllRooms(context.req.cookies)
  
    return {
      props: {
        user: data.data.user,
        rooms
      }
    }
  }