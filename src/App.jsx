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
 import BgImage from "../src/assets/wall2.jpg"
 import NavIma from "../src/assets/wallimage.jpg"
import Home from "./components/Home";

 function ProtectedRoute({ children }) {
   const { token } = useAuth();
   return token ? children : <Navigate to="/login" />;
 }

 function App() {

  const [isOpen, SetIsopen] = useState(false)
   return (
     <Router>
       <AuthProvider>
         <div
           className="  min-h-screen bg-cover bg-white md:py-3 p-2 px-4 text-center item"
            
         >
           <div className="flex justify-between relative text-black/50 border-b-3   bg-white mb-5 rounded-b-2xl  -m-4 pt-4 px-2 pb-3 md:px-9 ">
             <h1 className=" font-extrabold text-2xl text-black text-shadow-2xs ">
               EveryDay News
             </h1>
             <nav className="md:flex   hidden justify-center gap-6 mb-8  font-semibold">
               <Link to="/home" className="hover:underline hover:text-black">
                 Home
               </Link>
               <Link
                 to="/register"
                 className="hover:underline hover:text-black"
               >
                 Sign Up
               </Link>
               <Link to="/login" className="hover:underline hover:text-black">
                 Login
               </Link>
               <Link
                 to="/dashboard"
                 className="hover:underline hover:text-black "
               >
                 Dashboard
               </Link>
             </nav>

             {isOpen && (
               <nav className=" md:hidden z-50 flex flex-col w-full h-[400px] absolute bg-white justify-center gap-6 mb-8 text-blue-700 font-semibold">
                 <Link
                   onClick={() => SetIsopen(false)}
                   to="/Home"
                   className="hover:underline"
                 >
                   Home
                 </Link>

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
             <Route path="/home" element={<Home />} />
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
