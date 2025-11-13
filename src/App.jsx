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
 import Navmenu from "../src/assets/react.svg"
 import { useState } from "react";

 function ProtectedRoute({ children }) {
   const { token } = useAuth();
   return token ? children : <Navigate to="/login" />;
 }

 function App() {

  const [isOpen, SetIsopen] = useState(false)
   return (
     <Router>
       <AuthProvider>
         <div className=" bg-gray-300 min-h-screen md:py-10 p-2 px-4 text-center">
           <div className="flex justify-between relative mb-6 ">
             <h1 className=" font-extrabold text-2xl text-amber-600 text-shadow-2xs ">
               EveryDay News
             </h1>
             <nav className="md:flex hidden justify-center gap-6 mb-8 text-blue-700 font-semibold">
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

             {isOpen && (
               <nav className=" md:hidden z-50 flex flex-col w-full h-[400px] absolute bg-white justify-center gap-6 mb-8 text-blue-700 font-semibold">
                 <Link
                   onClick={() => SetIsopen(false)}
                   to="/register"
                   className="hover:underline"
                 >
                   Sign Up
                 </Link>
                 <Link
                   onClick={() => SetIsopen(false)}
                   to="/login"
                   className="hover:underline"
                 >
                   Login
                 </Link>
                 <Link
                   onClick={() => SetIsopen(false)}
                   to="/dashboard"
                   className="hover:underline"
                 >
                   Dashboard
                 </Link>
                 <h1
                   onClick={() => SetIsopen(false)}
                   className="hover:underline"
                 >
                   About Us
                 </h1>
                 <h1
                   onClick={() => SetIsopen(false)}
                   className="hover:underline"
                 >
                   Contact
                 </h1>
               </nav>
             )}

             <img
               onClick={() => SetIsopen(true)}
               className="md:hidden cursor-pointer"
               src={Navmenu}
               alt=""
             />
           </div>

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
