/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Venues from "./pages/Client/Venues";
import { SiteHeader } from "./components/home/SiteHeader";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/venues" element={<Venues />} />
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
