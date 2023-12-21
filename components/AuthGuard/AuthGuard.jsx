"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { selectCurrentUserToken } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [userAvailable, setUserAvailable] = useState(false);
  const token = useSelector(selectCurrentUserToken);
  //   console.log(token);
  //   useEffect(() => {
  //     const userDetailsJSON = localStorage.getItem("userToken");
  //     let userDetails = {};
  //     if (!!userDetailsJSON) {
  //       userDetails = JSON.parse(userDetailsJSON);
  //       setUserAvailable(true);
  //     } else {
  //       router.push("/signin");
  //     }
  //   }, []);
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [!!token]);
  //   if (!token) {
  //     router.push("/signin");
  //   }

  return children;
  //   if (userAvailable) {
  //     return children;
  //   }
};

export default AuthGuard;
