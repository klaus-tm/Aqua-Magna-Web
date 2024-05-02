import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "./config/theme";


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={isSignedIn ? <Home /> : <SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
