import NavBar from 'components/layout/nav-bar'
import SideBar from 'components/layout/side-bar';
import React from 'react'

export const withLayout = (
  Component
) => (props) => (
  <Layout>
    <Component {...props} />
  </Layout>
);


function Layout({ children }) {
  return (
    <div className='w-screen h-screen'>
      {/* <NavBar /> */}
      <SideBar />
      <section className='w-[calc(100%-280px)] h-fit bg-[#FAFCFF]'>{children}</section>
    </div>
  )
}

export default Layout