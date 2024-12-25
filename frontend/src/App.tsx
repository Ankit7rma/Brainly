import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Importing required components
import { Signin } from "./pages/Signin"; // Importing Signin page
import { Signup } from "./pages/Signup"; // Importing Signup page
import { Dashboard } from "./pages/dashboard"; // Importing Dashboard page
import "./App.css"; // Importing the CSS file

// App component to define the routing structure of the application
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the home page with Sign Up and Sign In buttons */}
        <Route
          path="/"
          element={
            <div className="home-container">
              <h1>Welcome to Our App</h1>
              <div className="buttons-container">
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
                <Link to="/signin">
                  <button>Sign In</button>
                </Link>
              </div>
            </div>
          }
        />
        {/* Route for the Signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Route for the Signin page */}
        <Route path="/signin" element={<Signin />} />
        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Exporting the App component as the default export
