 import { useAuth } from "../Context/AuthContext";
 import { useState } from "react";

 export default function Profile() {
   const { user, token, logout } = useAuth();
   const [formData, setFormData] = useState({
     name: user?.name || "",
     email: user?.email || "",
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) =>
     setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     try {
       const res = await fetch(
         `https://blog-app-oeay.onrender.com/admin/api/update-user/${user._id}`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify(formData),
         }
       );

       // Check if backend actually returned JSON
       const text = await res.text();
       let data;
       try {
         data = JSON.parse(text);
       } catch {
         throw new Error("Server did not return valid JSON");
       }

       if (!res.ok) throw new Error(data.message || "Update failed");

       alert("✅ Profile updated successfully!");
       localStorage.setItem("user", JSON.stringify(data.user));
     } catch (err) {
       alert("⚠️ " + err.message);
     } finally {
       setLoading(false);
     }
   };

   return (
     <div className="text-center">
       <h1 className="text-3xl font-bold mb-4">My Profile</h1>
       <form onSubmit={handleSubmit} className="flex flex-col items-center">
         <input
           type="text"
           name="name"
           value={formData.name}
           onChange={handleChange}
           className="border p-2 mb-4 w-1/2 rounded-lg"
           placeholder="Your Name"
         />
         <input
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           className="border p-2 mb-4 w-1/2 rounded-lg"
           placeholder="Your Email"
         />
         <button
           type="submit"
           className="bg-green-600 text-white px-4 py-2 rounded-lg"
           disabled={loading}
         >
           {loading ? "Updating..." : "Update Profile"}
         </button>
       </form>
       <button
         onClick={logout}
         className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg"
       >
         Logout
       </button>
     </div>
   );
 }
