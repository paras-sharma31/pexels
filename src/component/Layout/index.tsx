import React from 'react'
import NavBarChakra from './components/Navigation.tsx'



export const Layout = ({ children }) => {
  return (
    <main>
      <NavBarChakra />
      {children}
    </main>
  )
}
