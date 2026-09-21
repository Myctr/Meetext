import React, { useEffect, useState } from "react";
import "./App.css";
import { api, restoreSessionToken, setSessionToken } from "./api";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Interface from "./Pages/Interface";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const token = restoreSessionToken();
    if (!token) {
      setLoadingSession(false);
      return undefined;
    }
    api.get("/session")
      .then((response) => setUser(response.data))
      .catch(() => setSessionToken(null))
      .finally(() => setLoadingSession(false));
    return undefined;
  }, []);

  const handleAuthenticated = ({ user: authenticatedUser, token }) => {
    setSessionToken(token);
    setUser(authenticatedUser);
  };

  const handleSignOut = async () => {
    try {
      await api.post("/signout");
    } catch (error) {
      // Clear local state when the server cannot be reached.
    }
    setSessionToken(null);
    setUser(undefined);
  };

  if (loadingSession) return <div className="session-loading">Meetext yükleniyor...</div>;

  return (
    <div className="app-shell">
      <Navbar login={Boolean(user)} user={user} signOut={handleSignOut} />
      <main className="app-content">
        {user ? (
          <Interface user={user} />
        ) : (
          <Login onAuthenticated={handleAuthenticated} />
        )}
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
