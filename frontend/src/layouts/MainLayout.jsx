import React from 'react'
import { SiteHeader } from '../components/home/SiteHeader'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  )
}

export default MainLayout