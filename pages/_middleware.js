import { NextRequest, NextResponse } from 'next/server'
import { checkAuthToken } from '../utils/Apicalls'

export default async function middleware(req) {
    const { pathname } = req.nextUrl
    //console.log(req.cookies)
    
    const data = await checkAuthToken(req.cookies.jwt)
  
    if(data.data){
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
   
    return NextResponse.next()
}