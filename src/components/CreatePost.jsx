 import { useState } from "react";
 import { useAuth } from "../Context/AuthContext";

 export default function CreatePost({ onPostCreated }) {
   const { token } = useAuth();
   const [formData, setFormData] = useState({
     title: "",
     content: "",
     image: null,
   });

   const handleChange = (e) => {
     const { name, value, files } = e.target;
     if (name === "image") setFormData({ ...formData, image: files[0] });
     else setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const dataToSend = new FormData();
       dataToSend.append("title", formData.title);
       dataToSend.append("content", formData.content);
       dataToSend.append("image", formData.image);

       const res = await fetch("https://blog-app-oeay.onrender.com/api/post", {
         method: "POST",
         headers: { Authorization: `Bearer ${token}` },
         body: dataToSend,
       });

       const data = await res.json();
       if (!res.ok) throw new Error(data.message || "Post creation failed");

       alert("✅ Post created successfully!");
       setFormData({ title: "", content: "", image: null });
       if (onPostCreated) onPostCreated();
     } catch (err) {
       alert(`⚠️ ${err.message}`);
     }
   };

   return (
     <div className="mt-8 text-center">
       <h2 className="text-2xl mb-4 font-bold">Create a New Post</h2>
       <form
         onSubmit={handleSubmit}
         className="flex flex-col items-center"
         encType="multipart/form-data"
       >
        <div className=" flex gap-5 ">
         <input
           name="title"
           value={formData.title}
           onChange={handleChange}
           placeholder="Post title"
           className="w-1/2 p-2 mb-4 border-2 rounded-lg"
         /> 
          <input
           type="file"
           name="image"
           onChange={handleChange}
           accept="image/*"
           className="w-1/2 p-2 mb-4 border-2 rounded-lg"
         />
         </div>
         <textarea
           name="content"
           value={formData.content}
           onChange={handleChange}
           placeholder="Post content"
           className="w-1/2 p-2 mb-4 border-2 rounded-lg"
           rows="4"
         />
       
         <button
           type="submit"
           className="bg-green-600 text-white px-4 py-2 rounded-lg"
         >
           Publish
         </button>
       </form>
     </div>
   );
 }
