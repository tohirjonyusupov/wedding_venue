import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home";
import Venues from "./pages/client/Venues";
import VenueDetails from "./pages/client/VenueDetails";
import SignUp from "./pages/auth/SignUp";
import MainLayout from "./layouts/MainLayout";
import MyBookings from "./pages/client/MyBookings";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/auth/Login";
import NotFound from "./pages/error";

function App() {
  return (
    <>
    <Routes>
      {/* Public Route */}

      <Route element={<PublicRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:venue_id" element={<VenueDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>

      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>


      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        {routes.map(({ path, layout: Layout, children }) => (
          <Route key={path} path={path} element={<Layout />}>
            {children.map(({ path: childPath, element }, idx) => (
              <Route
                key={idx}
                index={childPath === ""}
                path={childPath}
                element={element}
              />
            ))}
          </Route>
        ))}
      </Route>

      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      </>
  );
}

export default App;
