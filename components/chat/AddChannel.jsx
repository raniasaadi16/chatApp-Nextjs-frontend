import React, {useState} from 'react';
import { createRoom } from '../../utils/Apicalls'
import { useRouter } from 'next/router'

export default function AddChannel({setisOpen}) {
    const [data, setData] = useState({name: '', shortName: '', description:''});
    const [loading, setloading] = useState(false);
    const [err, seterr] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        const newRoom = await createRoom(data)
        if(newRoom.room){
            router.push(`/rooms/${newRoom.room._id}`)
        }else{
            setloading(false)
            seterr(newRoom)
            setTimeout(() => {
                seterr('')
            }, 5000);
        }
    }
  return (
      <div className='w-full md:w-1/2 bg-white p-5 rounded text-dark'>
          {err && (
              <div className='bg-red-500 px-3 py-2'>{err}</div>
          )}
          <h3 className='text-lg pb-3 border-b text-center text-dark font-bold'>Create New Channel</h3>
          <form className='mt-3 space-y-3' onSubmit={handleSubmit}>
              <div className='space-y-2'>
                <p>Channel Name</p>
                <input type="text" placeholder='add a name' className='w-full border px-3 py-1 rounded' value={data.name} onChange={(e) => setData({...data,name : e.target.value})} required/>
              </div>
              <div className='space-y-2'>
                <p>Short Name</p>
                <input type="text" placeholder='add a short name' className='w-full border px-3 py-1 rounded' value={data.shortName} onChange={(e) => setData({...data,shortName : e.target.value})} required/>
              </div>
              <div className='space-y-2'>
                <p>Description</p>
                <textarea name="" id="" rows="4" placeholder='add a description' className='w-full border px-3 py-1 rounded' value={data.description} onChange={(e) => setData({...data,description : e.target.value})} required></textarea>
              </div>
              <div className="mt-6">
                  <button type='submit' className='bg-blue-500 px-3 py-2 rounded text-white font-semibold disabled:bg-blue-300 disabled:text-gray-200' disabled={loading}>{loading ? '...creating' : 'Add Channel'}</button>
                  <button type='button' className='bg-red-500 px-3 py-2 rounded text-white font-semibold ml-3' onClick={() => setisOpen(false)}>Cancel</button>
              </div>
          </form>
      </div>
  )
}
