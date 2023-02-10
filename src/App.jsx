import React, { Suspense, useEffect } from "react";
import { Navigate, redirect, Route, Routes } from "react-router-dom";
import "./App.css";
import useAuthContext from "./Hooks/useAuthContext";
// import Auth from './Pages/Auth/Auth'
// import Home from './Pages/Home/Home'
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Auth = React.lazy(() => import("./Pages/Auth/Auth"));

function App() {
  const { user, dispach } = useAuthContext();

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispach({ type: "LOGIN", payload: storedUser });
    }
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
