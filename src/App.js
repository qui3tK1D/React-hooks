import React, { useContext } from "react";
import MainHeader from "./Components/MainHeader/MainHeader";
import Login from "./Components/Login/Login";
import Home from "./Home/Home";
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
