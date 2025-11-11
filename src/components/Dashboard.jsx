 import { useAuth } from "../Context/AuthContext";
 import { useEffect, useState } from "react";
 import CreatePost from "./CreatePost";

 export default function Dashboard() {
   const { user, token, logout } = useAuth();
   const [posts, setPosts] = useState([]);

   useEffect(() => {
     if (token) fetchPosts();
   }, [token]);

   const fetchPosts = async () => {
     try {
       const res = await fetch("https://blog-app-oeay.onrender.com/api/posts");
       const data = await res.json();
       if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
       setPosts(data);
     } catch (err) {
       alert(err.message);
     }
   };

   const handleDelete = async (id) => {
     if (!window.confirm("Are you sure you want to delete this post?")) return;

     try {
       const res = await fetch(
         `https://blog-app-oeay.onrender.com/admin/api/delete-post/${id}`,
         {
           method: "DELETE",
           headers: { Authorization: `Bearer ${token}` },
         }
       );

       const data = await res.json();
       if (!res.ok) throw new Error(data.message || "Failed to delete post");

       alert("🗑️ Post deleted successfully!");
       fetchPosts();
     } catch (err) {
       alert(err.message);
     }
   };

   return (
     <div className="text-center">
       <h1 className="text-3xl font-bold mb-4">
         Welcome {user?.name || "User"} 👋
       </h1>
       <p className="mb-2 text-gray-700">Role: {user?.role}</p>
       <button
         onClick={logout}
         className="bg-red-600 text-white px-4 py-2 rounded-md mb-6"
       >
         Logout
       </button>

       <h2 className="text-2xl mb-4">All Posts</h2>
       <div className="space-y-4">
         {posts.length === 0 ? (
           <p>No posts found</p>
         ) : (
           posts.map((post) => (
             <div
               key={post._id}
               className="bg-white shadow-md rounded-lg p-4 mx-10"
             >
               <h3 className="font-bold text-xl mb-2">{post.title}</h3>
               <p className="mb-2">{post.content}</p>
               {post.image && (
                 <img
                   src={post.image}
                   alt={post.title}
                   className="w-64 mx-auto rounded-md mb-2"
                 />
               )}
               {user?.role === "admin" && (
                 <button
                   onClick={() => handleDelete(post._id)}
                   className="bg-red-600 text-white px-4 py-1 rounded-md mt-2 hover:bg-red-700"
                 >
                   Delete
                 </button>
               )}
             </div>
           ))
         )}
       </div>

       <CreatePost onPostCreated={fetchPosts} />
     </div>
   );
 }
