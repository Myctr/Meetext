import React, { useEffect, useState } from "react";
import "./App.css";
import { api, restoreSessionToken, setSessionToken } from "./api";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Interface from "./Pages/Interface";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "./i18n";

const THEME_KEY = "meetext_theme";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function App() {
  const { t } = useTranslation();
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
      return undefined;
    }
    api
      .get("/session")
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

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  if (loadingSession)
    return <div className="session-loading">{t("app.loading")}</div>;

  return (
    <div className="app-shell">
      <Navbar
        login={Boolean(user)}
        user={user}
        signOut={handleSignOut}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="app-content">
        {user ? (
          <Interface user={user} onUserUpdated={setUser} />
        ) : (
          <Login onAuthenticated={handleAuthenticated} />
        )}
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
  );
}

export default App;
