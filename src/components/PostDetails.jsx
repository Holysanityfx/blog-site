import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all posts, then filter the correct one
    fetch("https://blog-app-oeay.onrender.com/api/posts")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p._id === id);
        setPost(found);
      })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 block"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-6 shadow"
        />
      )}

      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
}

export default PostDetails;
