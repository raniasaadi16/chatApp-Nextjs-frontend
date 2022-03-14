import { NextRequest, NextResponse } from 'next/server'
//import { checkAuthToken } from '../utils/Apicalls'

export default async function middleware(req : NextRequest) {
    const { pathname } = req.nextUrl
    console.log(req.cookies)
    
    try{
        const res = await fetch(`https://chat-app-rania.herokuapp.com/api/users/isLoggedin/${req.cookies.jwt}`, {
            method: 'GET',
            credentials:'include',
            
        })
        const data = await res.json()
        if(!res.ok){
            throw data 
        }
        if(data.data){
            console.log(data.data)
            if(!data.data.isAuth && pathname !== '/login' && pathname !== '/signup'){
                return NextResponse.redirect('/login')
            }
            if(data.data.isAuth && pathname === '/login'){
                return NextResponse.redirect('/')
            }
            if(data.data.isAuth && pathname === '/signup'){
                return NextResponse.redirect('/')
            }
        }
    }catch(err){
        return console.log(err)
    }

    
   
    return NextResponse.next()
}