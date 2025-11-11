 import { useState } from "react";
 import { useAuth } from "../Context/AuthContext";

 export default function Login() {
   const { login } = useAuth();
   const [formData, setFormData] = useState({ email: "", password: "" });

   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     const res = await login(formData.email, formData.password);
     if (res?.user) {
       alert(`Welcome back, ${res.user.name}!`);
     }
   };

   return (
     <div className="text-center flex flex-col items-center">
       <h1 className="font-bold text-2xl mb-5">
         Welcome Back to Everyday News
       </h1>
       <p>Kindly login with your verified account</p>

       <form
         onSubmit={handleSubmit}
         className="flex flex-col items-center w-full"
       >
         <input
           name="email"
           onChange={handleChange}
           value={formData.email}
           className="w-1/2 mt-7 p-1 text-center border-2 rounded-lg"
           type="email"
           placeholder="Enter your Email"
         />
         <input
           name="password"
           onChange={handleChange}
           value={formData.password}
           className="w-1/2  mt-7 p-1 text-center border-2 rounded-lg"
           type="password"
           placeholder="Enter your Password"
         />

         <button
           type="submit"
           className="bg-green-600 border-2 text-white p-1 rounded-lg mt-3 cursor-pointer"
         >
           Login
         </button>
       </form>
     </div>
   );
 }
