import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Anyone can view posts, no redirect
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://blog-app-oeay.onrender.com/api/posts");
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || "Failed to fetch posts");
        return;
      }

      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Handle scroll navigation when in fullscreen
  useEffect(() => {
    const handleScroll = (e) => {
      if (selectedIndex === null) return;
      if (e.deltaY > 50) {
        setSelectedIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
      } else if (e.deltaY < -50) {
        setSelectedIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
      }
    };
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [selectedIndex, posts.length]);

  return (
    <div className="text-center flex flex-col items-center relative pt-2">
      <h1 className="text-3xl font-bold mb-4">
        Welcome {user?.name || "Guest"} 👋
      </h1>

      <div className="md:w-1/2 mb-5 text-gray-700">
        I’m so glad you’re here. This is a space where ideas, stories, and
        inspiration come together. Whether you’re here to learn something new,
        find motivation, or just enjoy a good read — make yourself at home. Grab
        a cup of coffee, explore a few posts, and let’s grow together!
      </div>

      <h2 className="text-2xl mb-4 font-semibold">All Posts</h2>

      {/* Posts Grid */}
      <div className="space-y-4 md:flex md:flex-wrap justify-center">
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={post._id}
              onClick={() => setSelectedIndex(index)}
              className="bg-white shadow-md md:w-80 rounded-lg p-4 mx-4 cursor-pointer hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <h3 className="font-bold text-xl mb-2">{post.title}</h3>
              <p className="text-gray-600 line-clamp-3">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover mt-3 rounded-md"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Fullscreen View */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key={posts[selectedIndex]._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 text-black rounded-2xl p-6 w-full h-full md:w-5/6 md:h-5/6 overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-black text-2xl font-bold hover:scale-110 transition"
              >
                ✖
              </button>

              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <h2 className="text-3xl font-bold mb-4">
                  {posts[selectedIndex].title}
                </h2>
                {posts[selectedIndex].image && (
                  <img
                    src={posts[selectedIndex].image}
                    alt={posts[selectedIndex].title}
                    className="w-full md:w-2/3 rounded-lg shadow-lg mb-6 object-cover"
                  />
                )}
                <p className="text-lg leading-relaxed max-w-3xl text-gray-800">
                  {posts[selectedIndex].content}
                </p>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? posts.length - 1 : prev - 1
                )
              }
              className="absolute left-4 text-white text-4xl hover:scale-125 transition"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === posts.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 text-white text-4xl hover:scale-125 transition"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
