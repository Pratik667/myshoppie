import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Cart, ProductDetail, ProductsList, Layout } from "./components/Navigations";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/pdp' element={<ProductDetail/>} />
            <Route path='/products' element={<ProductsList/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
