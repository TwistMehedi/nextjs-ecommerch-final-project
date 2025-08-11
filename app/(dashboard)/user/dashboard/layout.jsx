import UserSideBar from '@/app/components/Dashboard/User/UserSideBar'
import React from 'react'

const UserLayout = ({children}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <UserSideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <h1 className="text-red-600 text-lg">Ok</h1>
        {/* Responsive container */}
        <div className="w-full max-w-5xl mx-auto md:w-[700px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout
