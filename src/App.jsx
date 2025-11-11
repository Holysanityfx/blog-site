 import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link,
   Navigate,
 } from "react-router-dom";
 import Register from "./components/Register";
 import Login from "./components/Login";
 import Dashboard from "./components/Dashboard";
 import VerifyEmail from "./components/VerifyEmail";
 import Profile from "./components/Profile";
 import UserProfile from "./components/UserProfile";
 import CreateProduct from "./components/CreateProduct";
 import { AuthProvider, useAuth } from "./Context/AuthContext";

 function ProtectedRoute({ children }) {
   const { token } = useAuth();
   return token ? children : <Navigate to="/login" />;
 }

 function App() {
   return (
     <Router>
       <AuthProvider>
         <div className="bg-gray-300 md:my-20 md:mx-40 md:p-10 min-h-screen p-2 rounded-lg text-center">
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
             <Link to="/profile" className="hover:underline">
               Profile
             </Link>
           </nav>

           <Routes>
             <Route path="/" element={<Navigate to="/login" />} />
             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route
               path="/dashboard"
               element={
                 <ProtectedRoute>
                   <Dashboard />
                 </ProtectedRoute>
               }
             />
             <Route
               path="/profile"
               element={
                 <ProtectedRoute>
                   <Profile />
                 </ProtectedRoute>
               }
             />
             <Route
               path="/user/:id"
               element={
                 <ProtectedRoute>
                   <UserProfile />
                 </ProtectedRoute>
               }
             />
             <Route
               path="/create-product"
               element={ 
                 <ProtectedRoute>
                   <CreateProduct />
                 </ProtectedRoute>
               }
             />
             <Route path="/verify/:id" element={<VerifyEmail />} />
           </Routes>
         </div>
       </AuthProvider>
     </Router>
   );
 }

 export default App;
