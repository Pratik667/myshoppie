import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const Layout = React.lazy(() => import("./components/Layout"));
const Home = React.lazy(() => import("./components/ProductsMain/Home"));
const Cart = React.lazy(() => import("./components/Cart"));
const ProductDetail = React.lazy(() => import("./components/ProductsMain/ProductDetail"));
const ProductsList = React.lazy(() => import("./components/ProductsMain/ProductsList"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loader-container">
                <img src="./assets/mainloader.gif" alt="Loading..." className="loader" />
            </div>}>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pdp' element={<ProductDetail />} />
            <Route path='/products' element={<ProductsList />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;