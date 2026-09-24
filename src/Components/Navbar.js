import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "../i18n";

const Navbar = (props) => {
  const { language, changeLanguage, t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangSelect = (lang) => {
    changeLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-brand">
        Meetext<span>.</span>
      </div>
      <div className="navbar-controls">
        <button
          className={`theme-toggle ${props.theme === "dark" ? "is-dark" : ""}`}
          type="button"
          onClick={props.onToggleTheme}
          aria-label={props.theme === "dark" ? t("nav.switchToLight") : t("nav.switchToDark")}
          aria-pressed={props.theme === "dark"}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb">
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </span>
          </span>
        </button>

        <div className="language-dropdown" ref={langRef}>
          <button
            className="language-trigger"
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            aria-expanded={isLangOpen}
            aria-haspopup="listbox"
            aria-label={t("nav.language")}
          >
            <span className="language-current">{language.toUpperCase()}</span>
            <svg className="language-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          {isLangOpen && (
            <ul className="language-options" role="listbox" aria-label={t("nav.language")}>
              <li role="option" aria-selected={language === "tr"} onClick={() => handleLangSelect("tr")}>TR</li>
              <li role="option" aria-selected={language === "en"} onClick={() => handleLangSelect("en")}>EN</li>
            </ul>
          )}
        </div>
      </div>
      {props.login && props.user && (
        <div className="navbar-actions">
          <div className="profile-card">{props.user.name}</div>
          <button
            className="secondary-button"
            type="button"
            onClick={props.signOut}
          >
            {t("nav.signOut")}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
