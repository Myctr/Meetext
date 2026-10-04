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
    <nav className="app-navbar" data-theme={props.theme}>
      <div className="navbar-brand">
        Meetext<span>.</span>
      </div>
      <div className="navbar-controls">
        <button
          className="theme-toggle"
          type="button"
          onClick={props.onToggleTheme}
          aria-label={
            props.theme === "dark"
              ? t("nav.switchToLight")
              : t("nav.switchToDark")
          }
          aria-pressed={props.theme === "dark"}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb">
              <svg
                className="icon-sun"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <svg
                className="icon-moon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
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
            <span className="language-flag" aria-hidden="true">
              {language === "tr" ? "🇹🇷" : "🇺🇸"}
            </span>
            <span className="language-code">{language.toUpperCase()}</span>
            <svg
              className="language-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {isLangOpen && (
            <ul
              className="language-options"
              role="listbox"
              aria-label={t("nav.language")}
            >
              <li
                role="option"
                aria-selected={language === "tr"}
                onClick={() => handleLangSelect("tr")}
              >
                <span className="language-flag" aria-hidden="true">
                  🇹🇷
                </span>
                <span>Türkçe</span>
              </li>
              <li
                role="option"
                aria-selected={language === "en"}
                onClick={() => handleLangSelect("en")}
              >
                <span className="language-flag" aria-hidden="true">
                  🇺🇸
                </span>
                <span>English</span>
              </li>
            </ul>
          )}
        </div>
      </div>
      {props.login && props.user && (
        <div className="navbar-actions">
          <button
            className="icon-button avatar-button"
            type="button"
            aria-label={t("nav.profile")}
            title={props.user.name}
          >
            {props.user.avatar ? (
              <img className="avatar-image" src={props.user.avatar} alt="" />
            ) : (
              <span className="avatar-initial">
                {props.user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
          <button
            className="icon-button signout-button"
            type="button"
            onClick={props.signOut}
            aria-label={t("nav.signOut")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
