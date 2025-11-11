 import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
   Link,
 } from "react-router-dom";
 import Register from "./components/Register";
 import Login from "./components/Login";
 import Dashboard from "./components/Dashboard";
 import VerifyEmail from "./components/VerifyEmail";
 import { AuthProvider, useAuth } from "./Context/AuthContext";

 function ProtectedRoute({ children }) {
   const { token } = useAuth();
   return token ? children : <Navigate to="/login" />;
 }

 function App() {
   return (
     <Router>
       <AuthProvider>
         <div className="bg-gray-300 min-h-screen py-10 px-4 text-center">
           <nav className="flex justify-center gap-6 mb-8 text-blue-700 font-semibold">
             <Link to="/register" className="hover:underline">
               Sign Up
             </Link>
             <Link to="/login" className="hover:underline">
               Login
             </Link>
             <Link to="/dashboard" className="hover:underline">
               Dashboard
             </Link>
           </nav>

           <Routes>
             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route path="/verify/:id" element={<VerifyEmail />} />
             <Route
               path="/dashboard"
               element={
                 <ProtectedRoute>
                   <Dashboard />
                 </ProtectedRoute>
               }
             />
             <Route path="*" element={<Navigate to="/login" />} />
           </Routes>
         </div>
       </AuthProvider>
     </Router>
   );
 }

 export default App;
