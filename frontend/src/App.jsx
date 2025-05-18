/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import NotFound from "./pages/notFound";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Venues from "./pages/Client/Venues";
import VenueDetails from "./pages/Client/VenueDetails";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signUp";
import MainLayout from "./layouts/MainLayout";
import MyBookings from "./pages/Client/MyBookings";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      
      import MainLayout from "./layouts/MainLayout";

      <Route element={<PublicRoute />}>
      <Route element={<MainLayout />}> {/* ✅ Umumiy layout */}
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
  );
}

export default App;
