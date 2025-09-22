import React from 'react'
import LoginForm from './_components/LoginForm'

const page = () => {
  return (<div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div className='w-full flex flex-col items-center'>
        <img
          src="/Logo/omega_logo.png"
          alt="ICE Logo"
          className="h-8 w-auto"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Panel Login
        </h2>
      </div>
      <LoginForm />
    </div>
  </div>
  )
}

export default page