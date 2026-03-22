"use client";

import Joinqueue from "../../components/joinqueue/JoinQueuePage";


// import useAuth from "../hooks/useAuth";
// import Auth from "../../components/auth/auth";

// import { useRouter } from "next/navigation";

export default function Dashboard() {
   // const { user, loading } = useAuth();
   //    const router = useRouter();
   
   //    if (!loading && user) {
   //       router.push("/dashboard");
   //       return null; 
   //    }
   
   //    const handleLoginSuccess = () => {
   //       router.push("/"); 
   //    };


   return (
      <>
            {/* {loading ? (
               <h1>Loading...</h1>
            ) : !user ? (
               <Auth onLoginSuccess={handleLoginSuccess} /> 
            ) : null}

            {!loading && !user && (
               <div>DASHBOARD</div>
            )} */}
            <Joinqueue/>
      </>
   )
   }