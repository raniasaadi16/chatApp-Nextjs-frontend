import React from 'react'

export default function Close({sethiddBar}) {

  return (
    <button className='md:hidden absolute -right-9 top-3 rounded-full w-[30px] h-[30px] bg-black flex items-center justify-center cursor-pointer' onClick={() => sethiddBar(true)}>X</button>
  )
}
