import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

function Main(): JSX.Element {
  return (
    <>
    <div className='navigate'>
      <NavBar/>
      </div>
      <div className='bodyyy'>
        <Outlet/>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
      </>
  )
}

export default Main