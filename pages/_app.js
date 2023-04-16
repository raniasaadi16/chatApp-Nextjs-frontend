import { Router } from 'next/router'
import { useState } from 'react'
// import 'tailwindcss/tailwind.css'
import Loading from '../components/layout/Loading'
// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(false)
  Router.events.on('routeChangeStart', () => {
    setloading(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setloading(false)
  })
  
  return (
    <>
      {loading && <Loading/>                                                                                          
      }
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
