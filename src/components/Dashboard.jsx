 import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "../Context/AuthContext";
 import CreatePost from "./CreatePost";

 export default function Dashboard() {
   const { user, token, logout } = useAuth();
   const [posts, setPosts] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
     if (!token) navigate("/login");
     else fetchPosts();
   }, [token]);

   const fetchPosts = async () => {
     const res = await fetch("https://blog-app-oeay.onrender.com/api/posts", {
       headers: { Authorization: `Bearer ${token}` },
     });
     const data = await res.json();
     if (!res.ok) return alert(data.message || "Failed to fetch posts");
     setPosts(data);
   };
 const deletePost = async (id) => {
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
    if (!res.ok) throw new Error(data.message || "Delete failed");

    alert("🗑️ Post deleted successfully!");
    fetchPosts();
  } catch (err) {
    alert(`❌ ${err.message}`);
  }
};


   return (
     <div className="text-center">
       <h1 className="text-3xl font-bold mb-4">
         Welcome {user?.name || "User"} 👋
       </h1>
       <button
         onClick={() => {
           logout();
           navigate("/login");
         }}
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
               <h3 className="font-bold text-xl">{post.title}</h3>
               <p>{post.content}</p>
               {post.image && (
                 <img
                   src={post.image}
                   alt={post.title}
                   className="w-1/2 mx-auto mt-2 rounded-md"
                 />
               )}
               <button
                 onClick={() => deletePost(post._id)}
                 className="bg-red-500 text-white px-3 py-1 rounded mt-3"
               >
                 Delete
               </button>
             </div>
           ))
         )}
       </div>

       <CreatePost onPostCreated={fetchPosts} />
     </div>
   );
 }
