import axios from "axios";

export const API_URL = "http://localhost:3001";
export const SESSION_KEY = "meetext_session_token";

export const api = axios.create({ baseURL: API_URL });

export const setSessionToken = (token) => {
  if (token) {
    localStorage.setItem(SESSION_KEY, token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(SESSION_KEY);
    delete api.defaults.headers.common.Authorization;
  }
};

export const restoreSessionToken = () => {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) setSessionToken(token);
  return token;
};
