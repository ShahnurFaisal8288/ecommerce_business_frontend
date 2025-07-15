import { Outlet } from 'react-router-dom'
// import './App.css'
import MainNavbar from './components/Navbar'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <MainNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
