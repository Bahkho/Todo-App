import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";
import Body from "./pages/Body";
import Forgetpassword from "./pages/Forgetpassword";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notfound from "./pages/Notfound";
//--------------------------------------------------------------------------------
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/todo" element={<Body />} />
            <Route path="/logout" element={<Signout />} />
          </Route>
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
