import { Icon } from "@iconify/react"
import { useState } from "react";
import SideBar from "../components/sideBar/SideBar"
import { checkAuth, checkAuthTest, getAllRooms } from "../utils/Apicalls"


export default function Home({user, rooms}) {
  const [hiddBar, sethiddBar] = useState(true);

  return (
    <div className="md:flex">
{/* //       <SideBar rooms={rooms} user={user} hiddBar={hiddBar} sethiddBar={sethiddBar}/> */}
      <div className="md:ml-[324px] lg:ml-0 md:flex-auto">
        <div className="py-3 px-5 shadow-md flex justify-between items-center">
          <p>Chat APP</p>
          {hiddBar && (
            <button className="md:hidden" onClick={() => sethiddBar(false)}>
              <Icon className="text-3xl cursor-pointer" icon="bx:menu" />
            </button>
          )}
        </div>
        <div className="mt-4">
          <div className="text-center">
              <h3 className="text-lg">WELCOME </h3>    
              <h3 className="mt-4 font-bold text-xl">Please choose a Channel to start chating</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  console.log(context.req.headers)
  console.log(context.req.cookies)

  let user
  try{
      const res = await fetch(`${url}/users/isLoggedin`, {
          method: 'GET',
          credentials:'include',
          headers: {
              'Access-Control-Allow-Credentials': true,
              Cookie: req.headers.cookie
          },
      })
      const data = await res.json()
      if(!res.ok){
          throw data 
      }
      user = data  
  }catch(err){
      return console.log(err)
  }


  return {
    props: {
      user: data.data.user,
      rooms
    }
  }
}


