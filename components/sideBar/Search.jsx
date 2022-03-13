import React from 'react'
import { Icon } from '@iconify/react';
export default function Search() {
    return (
        <div className='relative'>
            <Icon icon="akar-icons:search" className='absolute top-1/2 left-2 -translate-y-1/2 text-lg' />
            <input type="text" className='py-2 bg-dark text-gray-500 w-full rounded pl-8 outline-none pr-2' placeholder='Search' />
        </div>
    )
}
