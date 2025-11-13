 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "../Context/AuthContext";

 export default function Login() {
   const { login } = useAuth();
   const [formData, setFormData] = useState({ email: "", password: "" });
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await login(formData.email, formData.password);
       if (res?.user) {
         alert(`Welcome back, ${res.user.name}!`);
         navigate("/dashboard");
       }
     } catch (err) {
       alert(err.message);
     }
   };

   return (
     <div className="text-center flex flex-col items-center">
       <h1 className="font-bold text-2xl mb-5">
         Welcome Back to Everyday News
       </h1>
       <form
         onSubmit={handleSubmit}
         className="flex flex-col items-center w-full"
       >
         <label className=" mt-5 font-extrabold text-black/50 ">
           {" "}
           Input Your correct Email{" "}
         </label>
         <input
           name="email"
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           value={formData.email}
           className=" md:w-1/2 w-full mb-5 p-2 text-center border-2 rounded-lg"
           type="email"
           placeholder="Enter your Email"
         />

         <label className=" mt-5 font-extrabold text-black/50 ">
           {" "}
           Input Your correct PAssword{" "}
         </label>
         <input
           name="password"
           onChange={(e) =>
             setFormData({ ...formData, password: e.target.value })
           }
           value={formData.password}
           className="md:w-1/2 w-full mb-10 p-2 text-center border-2 rounded-lg"
           type="password"
           placeholder="Enter your Password"
         />
         <button
           type="submit"
           className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
         >
           Login
         </button>
       </form>
     </div>
   );
 }
