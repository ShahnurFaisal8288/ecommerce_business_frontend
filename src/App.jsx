import { Outlet } from "react-router-dom";
// import './App.css'
import MainNavbar from "./components/Navbar";
import Footer from "./components/Footer";
// import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      {/* <CartProvider> */}
        <MainNavbar />
        <Outlet />
        <Footer />
      {/* </CartProvider> */}
    </>
  );
}

export default App;
