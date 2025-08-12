import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";

function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/register"]; // pages without navbar

  return (
    <>
      {/* Conditionally render Navbar */}
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="developers" element={<Developers />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}



// import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";
// import PrivateRoute from "./components/PrivateRoute";
// import Developers from "./pages/Developers";

// function App(){
//   return (
//     <Router>
//         <Navbar />
//           <Routes>
//             <Route path ="/" element={<Home />}/>
//             <Route path="/login" element={<Login />}/>
//             <Route path= "/register" element={<Register />}/>
//             <Route 
//               path="/dashboard" 
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>}/>
//             <Route
//               path="/dashboard/developers"
//               element={
//                 <PrivateRoute>
//                   <Developers />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//     </Router>
//   );
// }

// export default App;