import React, {useState, useEffect} from 'react';
import { joinRoom } from '../../utils/Apicalls';

export default function Form({room, isJoined, handleSubmit, newMessage, setnewMessage, socket, setroom, user, isTyping, setisTyping}) {
   // const [startTyping, setstartTyping] = useState(false);
    const handleJoin = async () => {
        const data = await joinRoom(room._id)
        if(data.updatedRoom){
            setroom(data.updatedRoom)
            // send new room members to all users of room
            socket.emit('addUserToRoom', data.updatedRoom, room._id)
        }
    }
    const typing = () => {
        //setstartTyping(true)
        socket?.emit('typing', room._id)
    }
    // useEffect(() => {
    //     startTyping && socket?.emit('typing', user, room._id)
    // }, [isTyping, startTyping]);
    return (
        <>
        {isJoined ? (
                <form className="relative" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Type a message here" className="my-3 py-2 px-2 bg-gray-700 text-gray-500 w-full rounded-md outline-none" value={newMessage} onChange={e => setnewMessage(e.target.value)} onInput={typing}/>
                    <button type="submit" className="absolute px-2 py-1 rounded bg-blue-500 top-1/2 -translate-y-1/2 right-[5px]">send</button>
                </form>
                ) : (
                    <button type="button" className="w-full p-2 text-center bg-blue-500 rounded" onClick={handleJoin}>Join the Chat</button>
            )}
        </>
    );
}
