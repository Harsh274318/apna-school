import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HamBurger from './pages/landing/HamBurger';
import { RxHamburgerMenu } from 'react-icons/rx';
import AppRoutes from './routes/AppRoutes';
import "./components/forms/form.css"
import "./pages/posts.css"
import "./layout/index.css"
import "./layout/nav.css"
import "./components/forms/loading.css"






function App() {



  return (
    <>
      <AppRoutes />
      {/* <CreateStudent /> */}


    </>
  )
}

export default App
