import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Login from "./Pages/Login";
import Interface from "./Pages/Interface";
import styles from "./Styles/MainStyle";

function App() {
  const [user,setUser] = useState();
  const { background, page } = styles;
  const [login, setLogin] = useState(false);
  const loginHandler = () => {
    login ? setLogin(false) : setLogin(true);
  };
  return (
    <div style={background}>
      <Navbar login={login} user={user} signOut={loginHandler} />
      <div style={page}>
        {login ? <Interface user={user} /> : <Login signIn={loginHandler} setUser={setUser} />}
      </div>
      <div>
        <About />
      </div>
    </div>
  );
}

export default App;
