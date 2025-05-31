import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { Provider } from "react-redux";
import store from "./components/GlobalStore/store";

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
    <Provider store={store}>
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
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route path="/pdp" element={<ProductDetail />} />
              <Route path="/products" element={<ProductsList />} />
              <Route
                path="/accounts"
                element={
                  <PrivateRoute>
                    <Accounts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
              />
              <Route path="/mylocation" element={<SetLocation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
