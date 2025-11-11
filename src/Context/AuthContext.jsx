 import { createContext, useState, useContext, useEffect } from "react";
 import { useNavigate } from "react-router-dom";

 const AuthContext = createContext();

 export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("token"));
   const baseUrl = "https://blog-app-oeay.onrender.com/api";
   const navigate = useNavigate();

   useEffect(() => {
     if (token) {
       try {
         const userData = JSON.parse(localStorage.getItem("user"));
         if (userData) setUser(userData);
       } catch {}
     }
   }, [token]);

   const register = async (name, email, password) => {
     try {
       const res = await fetch(`${baseUrl}/register`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, email, password }),
       });
       const data = await res.json();

       if (!res.ok) throw new Error(data.message || "Registration failed");
       alert(
         "✅ Registration successful! Please verify your email before logging in."
       );
       return data;
     } catch (err) {
       alert(err.message);
     }
   };

   const login = async (email, password) => {
     try {
       const res = await fetch(`${baseUrl}/login`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password }),
       });
       const data = await res.json();
       if (!res.ok) throw new Error(data.message || "Login failed");

       setUser(data.user);
       setToken(data.token);
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));

       navigate("/dashboard");
       return data;
     } catch (err) {
       alert(err.message);
     }
   };

   const logout = () => {
     setUser(null);
     setToken(null);
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     navigate("/login");
   };

   return (
     <AuthContext.Provider value={{ user, token, register, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 };

 export const useAuth = () => useContext(AuthContext);
