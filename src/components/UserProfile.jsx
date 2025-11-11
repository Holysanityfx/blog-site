import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function UserProfile() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `https://blog-app-oeay.onrender.com/api/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user");
      setUserInfo(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (user?.role !== "admin")
    return <p className="text-center text-red-600">Access Denied ❌</p>;

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {!userInfo ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 inline-block text-left">
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Role:</strong> {userInfo.role}
          </p>
          <p>
            <strong>ID:</strong> {userInfo._id}
          </p>
        </div>
      )}
    </div>
  );
}
