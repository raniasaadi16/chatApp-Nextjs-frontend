import { NextRequest, NextResponse } from 'next/server'
import { checkAuthToken } from '../utils/Apicalls'

export default async function middleware(req) {
    const { pathname, origin } = req.nextUrl
    //console.log(req.cookies)
    
    const data = await checkAuthToken(req.cookies.jwt)
    console.log(data)
    // if(data.data){
    //     if(!data.data.isAuth && pathname !== '/login' && pathname !== '/signup'){
    //         return NextResponse.rewrite(`${origin}/login`)
    //     }
    //     if(data.data.isAuth && pathname === '/login'){
    //         return NextResponse.rewrite(`${origin}/`)
    //     }
    //     if(data.data.isAuth && pathname === '/signup'){
    //         return NextResponse.rewrite(`${origin}/`)
    //     }
    // }
   
    return NextResponse.next()
}