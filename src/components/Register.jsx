import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import ImageLogo from "../assets/wallimage.jpg"
import { div } from "framer-motion/client";
export default function Register() {

    const {register} = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData ({...formData, [e.target.name]: e.target.value});
    };

    const handdleSubmit= async (e) => {
       e.preventDefault();
       await register(formData.name, formData.email, formData.password);  
    };

  return (
    <div className="flex md:px-90 w-full">
    <div className="relative text-center flex flex-col items-center md:w-150  p-4 rounded-bl-4xl rounded-tr-4xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs"
        style={{ backgroundImage: `url(${ImageLogo})` }}
      ></div>

      <div className="relative z-10 w-full ">
        <h1 className="font-extrabold text-2xl mb-5 text-white ">
          Welcome to Everyday News
        </h1>
        <p className=" text-white font-bold mb-2">
          Kindly Login or sign up if you are yet to have an account
        </p>

        <form
          onSubmit={handdleSubmit}
          className="flex flex-col text-white items-center"
        >
          <label className="mt-7 font-extrabold ">
            Input Your Correct Name
          </label>
          <input
            className=" md:w-1/2 w-full p-2 text-center border-4 rounded-bl-3xl  rounded-tr-3xl"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Input your Name"
          />

          <label className="mt-7 font-extrabold ">
            Input Your Correct Email
          </label>
          <input
            className="md:w-1/2 w-full p-2 text-center border-4 rounded-bl-3xl  rounded-tr-3xl"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Input your Email"
          />

          <label className="mt-7 font-extrabold ">
            Create a Strong Password
          </label>
          <input
            className="md:w-1/2 w-full p-2 text-center border-4 rounded-bl-3xl  rounded-tr-3xl"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Create your Password"
          />

          <button
            type="submit"
            className="bg-green-600 border-2 text-white p-2 rounded-lg mt-5 hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
