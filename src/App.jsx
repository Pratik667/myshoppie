import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./components/ProductsMain/Home"));
const Cart = lazy(() => import("./components/Essentials/Cart"));
const ProductDetail = lazy(
  () => import("./components/ProductsMain/ProductDetail"),
);
const ProductsList = lazy(
  () => import("./components/ProductsMain/ProductsList"),
);
const Wishlist = lazy(() => import("./components/Essentials/Wishlist"));
const Accounts = lazy(() => import("./components/Essentials/Accounts"));
const SetLocation = lazy(() => import("./components/Essentials/SetLocation"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="loader-container">
            <img
              src="./assets/mainloader.gif"
              alt="Loading..."
              className="loader"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pdp" element={<ProductDetail />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/mylocation" element={<SetLocation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
