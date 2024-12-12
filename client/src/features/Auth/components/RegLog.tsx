import React, { useState } from 'react'
import Log from './AuthorisationPage'
import Reg from './RegistrationPage'
import '../styles/auth.scss'

function RegLog (): JSX.Element {
  const [logReg, setLogReg] = useState(false)

  return (
   <div className='contai'>
    <div className='contAuth'>
      <div className='log-reg'>
        <div className='log-reg-button-enter'>
      <button onClick={() => { setLogReg(false) }} className={logReg ? 'log-reg-button' : 'log-reg-button disabled'} type='button' >ВОЙТИ</button>
        </div>
        <div className='log-reg-button-registration'>
      <button onClick={() => { setLogReg(true) }} className= { logReg ? 'log-reg-button disabled ' : 'log-reg-button'} type='button'>РЕГИСТРАЦИЯ</button>

        </div>
      </div>
      { logReg && <Reg/>}
      { !logReg && <Log/>}
    </div>
   </div>

  )
}

export default RegLog