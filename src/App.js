import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { api, restoreSessionToken, setSessionToken } from "./api";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Interface from "./Pages/Interface";
import Create from "./Components/Create";
import Join from "./Components/Join";
import History from "./Components/History";
import Meet from "./Pages/Meet";
import Welcome from "./Components/Welcome";
import Note from "./Components/Note";
import Profile from "./Components/Profile";
import { Toaster } from "react-hot-toast";

const THEME_KEY = "meetext_theme";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark
    ? "dark"
    : "light";
};

const ProtectedRoute = ({ children, user, loadingSession }) => {
  if (loadingSession) {
    return <div className="session-loading">Loading...</div>;
  }
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children, user, loadingSession }) => {
  if (loadingSession) {
    return <div className="session-loading">Loading...</div>;
  }
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  const [user, setUser] = useState();
  const [loadingSession, setLoadingSession] = useState(true);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const token = restoreSessionToken();
    if (!token) {
      setLoadingSession(false);
      return;
    }
    api
      .get("/session")
      .then((response) => setUser(response.data))
      .catch(() => setSessionToken(null))
      .finally(() => setLoadingSession(false));
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

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-shell">
        <Navbar
          login={Boolean(user)}
          user={user}
          signOut={handleSignOut}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="app-content">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute user={user} loadingSession={loadingSession}>
                  <Login onAuthenticated={handleAuthenticated} />
                </PublicRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute user={user} loadingSession={loadingSession}>
                  <Interface
                    user={user}
                    onUserUpdated={setUser}
                    handleAuthenticated={handleAuthenticated}
                  />
                </ProtectedRoute>
              }
            >
              <Route index element={<Welcome />} />
              <Route path="create" element={<Create user={user} />} />
              <Route path="join" element={<Join user={user} />} />
              <Route path="history" element={<History user={user} />} />
              <Route path="history/:id/notes" element={<Note />} />
              <Route path="profile" element={<Profile user={user} onUpdated={setUser} />} />
              <Route path="meeting/:id" element={<Meet user={user} />} />
            </Route>
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
              fontFamily: "inherit",
              background: "var(--toast-surface)",
              color: "var(--ink)",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
