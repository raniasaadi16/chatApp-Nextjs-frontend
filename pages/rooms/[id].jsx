import { useState, useEffect, useRef } from "react"
import { io } from 'socket.io-client'
import { checkAuth, getMessages, getRoom, sendMessage, leaveRoom } from "../../utils/Apicalls"
import RoomBar from "../../components/sideBar/RoomBar"
import Message from "../../components/chat/Message"
import Form from "../../components/chat/Form"
import { Icon } from "@iconify/react"

export default function RoomChat({user, chatRoom, messages}) {
  const [msg, setmsg] = useState(messages);
  const [newMessage, setnewMessage] = useState('')
  const [socket, setsocket] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [room, setroom] = useState(chatRoom);
  const [loading, setloading] = useState(false);
  const [isTyping, setisTyping] = useState(false); 
  const scrollRef = useRef(null)
  const scrollWhenType = useRef(null)
  const isJoined = room.members.some(member => member._id === user._id)
  const [hiddBar, sethiddBar] = useState(true);
  
  
  // connect to socket
  useEffect(() => {
    setsocket(io('https://chat-api-app.adaptable.app'))
  },[])
  // when user is connected set his status to online and send this status to all connected users
  ///*************************************************USE CLENUP FOR USEFEEVT*********************************************************** */
  useEffect(() => {
    let didcancel = false
    if (!didcancel) {
      socket?.emit('onlineUser', user._id)
      socket?.on('getUsers', users => {
        setonlineUsers(users)
      })
      socket?.on('is-typing', () => {
        setisTyping(true)
      })
      socket?.on('not-typing', () => {
        setisTyping(false)
      }) 
    }
    return didcancel = true
  }, [socket, user._id]);
  // if the user is already a member of the room , join him to room socket server,if he join or leave the room send the information to all users
  useEffect(() => {
    let didCancel = false;
    if(isJoined){
      socket?.emit('join-room', room._id)
      socket?.on('getMessage', ({ sender, content}) => {
        if(!didCancel){
          setmsg(prev => [...prev,{sender, room: room._id, content}])
        }
      })
      socket?.on('getUpdatedRoom',newRoom => {
        setroom(newRoom)
      } )
    }
    return () => {
      didCancel= true
    }
  }, [socket, room])
  // detect if user is typing a message
  useEffect(() => {
    let detect = setTimeout(() => {
      setisTyping(false)
      socket?.emit('stop-typing', room._id)
    }, 1000);
    return () => {
      clearTimeout(detect)
    }
  }, [newMessage, room]);
  // leave channel
  const leaveChannel = async () => {
    setloading(true)
    const data = await leaveRoom(room._id)
    if(data.updatedRoom){
      setroom(data.updatedRoom)
      setloading(false)
      socket.emit('removeUserFromRoom', data.updatedRoom, room._id)
    }
  }
  // send message
  const handleSubmit = async e => {
    e.preventDefault()
    if(!newMessage){return}
    await sendMessage({content: newMessage}, room._id)
    const message = {
      sender : user, 
      room: room._id,
      content: newMessage,
      createdAt: Date.now()
    }
    
    socket?.emit('sendMessage', {
      sender: user,
      roomId : room._id,
      content: newMessage
    })
    socket?.emit('stop-typing', room._id)

    setmsg([...msg,message])
    setnewMessage('')
  }

  //scroll to last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  //scroll when type
  useEffect(() => {
    scrollWhenType.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping]);

  return (
    <div className="md:flex">
      <RoomBar room={room} onlineUsers={onlineUsers} user={user} hiddBar={hiddBar} sethiddBar={sethiddBar}/>
      <div className="md:ml-[324px] lg:ml-0 md:flex-auto">
            <div className="py-3 px-5 shadow-md flex justify-between">
                <p className="font-bold">{room.name.toUpperCase()}</p>
                {isJoined && <button type="button" className="bg-blue-500 px-3 py-1 rounded disabled:bg-blue-200" onClick={leaveChannel} disabled={loading}>{loading ? 'leaving...' : 'Leave Channel'}</button>} 
                {hiddBar && (
                  <button className="md:hidden" onClick={() => sethiddBar(false)}>
                    <Icon className="text-3xl cursor-pointer" icon="bx:menu" />
                  </button>
                )}
            </div>
        <div className="px-5 overflow-hidden">
            <div className="my-5 space-y-3 overflow-auto" style={{height: "calc(100vh - 163px)"}}>
                {msg.length > 0 && msg.map((message, index) => (
                  <div key={index} ref={scrollRef}>
                      <Message message={message} userId={user._id}/>
                  </div>
                ))
                }
                {isTyping && (
                  <div className="bg-darker rounded-full w-max py-2 px-3" ref={scrollWhenType}>
                    <p className="font-bold text-gray-200">typing ...</p>
                  </div>
                )}
            </div>
            <div className="mt-3">
              <Form room={room} isJoined={isJoined} handleSubmit={handleSubmit} user={user} newMessage={newMessage} setnewMessage={setnewMessage} setroom={setroom} socket={socket && socket} isTyping={isTyping} setisTyping={setisTyping} />
            </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const data = await checkAuth(context.req.cookies)
  const room = await getRoom(context.req.cookies, context.query.id)
  const messages = await getMessages(context.req.cookies, context.query.id)

  return {
    props: {
      user: data.data.user,
      chatRoom: room,
      messages
    }
  }
}
