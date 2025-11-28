 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "../Context/AuthContext";
 import ImageLogo from "../assets/wallimage.jpg";

 export default function Login() {
   const { login } = useAuth();
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true); // Start loading animation

     try {
       const res = await login(formData.email, formData.password);
       if (res?.user) {
         alert(`Welcome back, ${res.user.name}!`);
         navigate("/dashboard");
       }
     } catch (err) {
       alert(err.message);
     } finally {
       setLoading(false); // Stop loading animation
     }
   };

   return (
     <div className="flex justify-center w-full">
       <div className="relative text-center md:w-120 font-extrabold flex flex-col items-center p-5 mt-10 rounded-bl-4xl rounded-tr-4xl overflow-hidden">
         <div
           className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs"
           style={{ backgroundImage: `url(${ImageLogo})` }}
         ></div>

         <div className="relative z-10 text-white">
           <h1 className="font-bold text-2xl mb-5">
             Welcome Back to Everyday News
           </h1>

           <form
             onSubmit={handleSubmit}
             className="flex flex-col items-center w-full"
           >
             <label className="mt-5 font-extrabold">
               Input Your correct Email
             </label>
             <input
               name="email"
               onChange={(e) =>
                 setFormData({ ...formData, email: e.target.value })
               }
               value={formData.email}
               className="md:w-60 w-full rounded-bl-3xl rounded-tr-3xl mb-5 p-2 text-center border-4"
               type="email"
               placeholder="Enter your Email"
             />

             <label className="mt-5 font-extrabold">
               Input Your correct Password
             </label>
             <input
               name="password"
               onChange={(e) =>
                 setFormData({ ...formData, password: e.target.value })
               }
               value={formData.password}
               className="md:w-60 w-full rounded-bl-3xl rounded-tr-3xl mb-10 p-2 text-center border-4"
               type="password"
               placeholder="Enter your Password"
             />

             <button
               type="submit"
               disabled={loading}
               className={`bg-green-600 text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2 ${
                 loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
               }`}
             >
               {loading ? (
                 <>
                   <div className="h-5 w-5 border-4 border-white border-t-transparent animate-spin rounded-full"></div>
                   Logging in...
                 </>
               ) : (
                 "Login"
               )}
             </button>
           </form>
         </div>
       </div>
     </div>
   );
 }
