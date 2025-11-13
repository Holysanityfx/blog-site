 import { createContext, useState, useContext, useEffect } from "react";

 const AuthContext = createContext();
 const baseUrl = "https://blog-app-oeay.onrender.com/api";

 export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("token"));

   useEffect(() => {
     if (token) {
       try {
         const savedUser = JSON.parse(localStorage.getItem("user"));
         if (savedUser) setUser(savedUser);
       } catch {}
     }
   }, [token]);

   const register = async (name, email, password) => {
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
   };

   const login = async (email, password) => {
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
     return data;
   };

   const logout = () => {
     setUser(null);
     setToken(null);
     localStorage.clear();
   };

   return (
     <AuthContext.Provider value={{ user, token, register, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 };

 export const useAuth = () => useContext(AuthContext); 
