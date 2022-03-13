import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom'

export default function Popup({isOpen, setisOpen, children}) {
    const [mounted, setmounted] = useState(false);
    useEffect(() => {
        setmounted(true)

        return () => setmounted(false)
    }, []);

    return (mounted && isOpen) ? ReactDOM.createPortal((
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 pb-24 overflow-auto z-20'>
            <button className='absolute right-0 text-xl text-white pt-5 pr-5 pb-5' onClick={() => setisOpen(false)}>X</button>
            <div className='flex items-center justify-center h-full'>
                {children}
            </div>
        </div>
    ), document.getElementById('popup')) : null
}
