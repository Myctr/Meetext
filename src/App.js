import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Interface from "./Pages/Interface";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState();
  const [login, setLogin] = useState(false);
  const loginHandler = () => setLogin((isLoggedIn) => !isLoggedIn);

  return (
    <div className="app-shell">
      <Navbar login={login} user={user} signOut={loginHandler} />
      <main className="app-content">
        {login ? <Interface user={user} /> : <Login signIn={loginHandler} setUser={setUser} />}
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: "12px", fontFamily: "inherit" },
        }}
      />
    </div>
  );
}

export default App;
