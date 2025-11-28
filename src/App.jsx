 import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
   Link,
   NavLink,
 } from "react-router-dom";

 import Register from "./components/Register";
 import Login from "./components/Login";
 import Dashboard from "./components/Dashboard";
 import VerifyEmail from "./components/VerifyEmail";
 import { AuthProvider, useAuth } from "./Context/AuthContext";

 import Navmenu from "../src/assets/icon-menu.svg";
 import { useState } from "react";

 import Home from "./components/Home";
 import PostDetails from "./components/PostDetails";

 function ProtectedRoute({ children }) {
   const { token } = useAuth();
   return token ? children : <Navigate to="/login" />;
 }

 function App() {
   const [isOpen, SetIsopen] = useState(false);

   return (
     <Router>
       <AuthProvider>
         <div className="min-h-screen bg-cover bg-white md:py-3 p-2 px-4 text-center item">
           <div className="flex flex-col justify-between text-black/50 border-b-2 bg-white mb-5 rounded-b-2xl -m-4 pt-4 px-2 pb-3 md:px-25 ">
             <div className="flex justify-between ">
               <h1 className="font-extrabold text-2xl text-blue-700">
                 EveryDay News
               </h1>

               <nav className="md:flex hidden justify-center gap-6 mb-8 font-semibold">
                 <NavLink
                   to="/home"
                   className={({ isActive }) =>
                     isActive
                       ? "text-blue-700 underline"
                       : "hover:underline hover:text-black"
                   }
                 >
                   Home
                 </NavLink>

                 <NavLink
                   to="/register"
                   className={({ isActive }) =>
                     isActive
                       ? "text-blue-700 underline"
                       : "hover:underline hover:text-black"
                   }
                 >
                   Sign Up
                 </NavLink>

                 <NavLink
                   to="/login"
                   className={({ isActive }) =>
                     isActive
                       ? "text-blue-700 underline"
                       : "hover:underline hover:text-black"
                   }
                 >
                   Login
                 </NavLink>

                 <NavLink
                   to="/dashboard"
                   className={({ isActive }) =>
                     isActive
                       ? "text-blue-700 underline"
                       : "hover:underline hover:text-black"
                   }
                 >
                   Dashboard
                 </NavLink>
               </nav>

               <img
                 onClick={() => SetIsopen(true)}
                 className="md:hidden cursor-pointer h-7"
                 src={Navmenu}
                 alt=""
               />
             </div>

             {isOpen && (
               <nav className="md:hidden z-50 flex flex-col w-full bg-white gap-2 text-black font-semibold">
                 <Link onClick={() => SetIsopen(false)} to="/home">
                   Home
                 </Link>
                 <Link onClick={() => SetIsopen(false)} to="/register">
                   Sign Up
                 </Link>
                 <Link onClick={() => SetIsopen(false)} to="/login">
                   Login
                 </Link>
                 <Link onClick={() => SetIsopen(false)} to="/dashboard">
                   Dashboard
                 </Link>
               </nav>
             )}
           </div>

           <Routes>
             <Route path="/home" element={<Home />} />
             <Route path="/post/:id" element={<PostDetails />} />

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

             <Route path="*" element={<Navigate to="/home" />} />
           </Routes>
         </div>
       </AuthProvider>
     </Router>
   );
 }

 export default App;
