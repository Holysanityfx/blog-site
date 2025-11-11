import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function CreateProduct() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
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
      dataToSend.append("description", formData.description);
      dataToSend.append("price", formData.price);
      dataToSend.append("image", formData.image);

      const res = await fetch(
        "https://blog-app-oeay.onrender.com/api/product",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: dataToSend,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Product creation failed");
      alert("✅ Product created successfully!");
      setFormData({ title: "", description: "", price: "", image: null });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Create Product</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
        encType="multipart/form-data"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="border p-2 mb-4 w-1/2 rounded-lg"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="border p-2 mb-4 w-1/2 rounded-lg"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Product Price"
          className="border p-2 mb-4 w-1/2 rounded-lg"
          type="number"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="border p-2 mb-4 w-1/2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
