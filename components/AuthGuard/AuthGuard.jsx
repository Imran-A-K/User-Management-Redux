"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectCurrentUserToken } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const token = useSelector(selectCurrentUserToken);

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [!!token]);

  return children;
};

export default AuthGuard;
