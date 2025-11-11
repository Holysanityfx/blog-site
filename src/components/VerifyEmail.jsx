 import { useEffect, useState } from "react";
 import { useParams, Link } from "react-router-dom";

 export default function VerifyEmail() {
   const { id } = useParams();
   const [message, setMessage] = useState("Verifying your email...");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const verifyEmail = async () => {
       try {
         const res = await fetch(
           `https://blog-app-oeay.onrender.com/api/verify-email/${id}`
         );
         const data = await res.json();

         if (!res.ok) throw new Error(data.message || "Verification failed");
         setMessage("✅ Email verified successfully!");
       } catch (err) {
         setMessage(`❌ ${err.message}`);
       } finally {
         setLoading(false);
       }
     };
     verifyEmail();
   }, [id]);

   return (
     <div className="text-center flex flex-col items-center mt-20">
       <h1 className="font-bold text-2xl mb-4">Email Verification</h1>
       <p className="mb-8 text-lg">{message}</p>

       {!loading && (
         <Link
           to="/login"
           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
         >
           Go to Login
         </Link>
       )}
     </div>
   );
 }
