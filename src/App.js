import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseElements";
import ErrorPage from "./pages/ErrorPage";
import WelcomePage from "./pages/WelcomePage";

/**
 * main structure handler of the app
 * it creates the react router dom routes
 * it checks if any Auth instance exists
 * the index page is modified accordingly to the check above
 * @returns the router structure with the corresponding pages and calls
 */
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
          <Route index element={isSignedIn ? <Home /> : <WelcomePage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
