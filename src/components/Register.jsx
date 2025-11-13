import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
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
    <div className="text-center flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-5">Welcome to Everyday News</h1>
      <p>Kindly Login or sign up if you are yet to have an account</p>

      <form
        onSubmit={handdleSubmit}
        className="flex flex-col items-center w-full"
      >
        <label className=" mt-7 font-extrabold text-black/50">
          {" "}
          Input Your Correct name{" "}
        </label>
        <input
          className=" md:w-1/2 w-full mt p-1 text-center border-2 rounded-lg  "
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Input your Name"
        />

        <label className=" mt-7 font-extrabold text-black/50">
          {" "}
          Input Your Correct Email{" "}
        </label>
        <input
          className="md:w-1/2 w-full p-1 text-center border-2 rounded-lg  "
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Input your Email"
        />
        <label className="  mt-7 font-extrabold text-black/50">
          {" "}
          Create a Strong password{" "}
        </label>
        <input
          className=" md:w-1/2 w-full p-1 text-center border-2 rounded-lg  "
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Create your Password"
        />
        <button
          type="submit"
          className="bg-green-600 border-2 text-white p-1 rounded-lg mt-3 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
