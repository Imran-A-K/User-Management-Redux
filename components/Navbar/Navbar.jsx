"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import dummyUser from "/public/images/dummyUser.png";
import { HiCollection } from "react-icons/hi";
import { cn } from "@/lib/Utilkit/Utilkit";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { useGetUserByIdQuery } from "../Redux/Slices/apiSlice";
import {
  logOut,
  selectCurrentUserId,
  selectCurrentUserToken,
} from "../Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const CustomLink = ({ href, title, className = "" }) => {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "relative text-white rounded-lg px-2 py-1 transition-colors ease-in-out duration-300",
        className,
        pathName === href ? "bg-slate-100/25" : null
      )}
    >
      {title}
    </Link>
  );
};

function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // localStorage.removeItem("userToken");
    // router.push("/signin");
    dispatch(logOut());
  };
  const id = useSelector(selectCurrentUserId);
  const token = useSelector(selectCurrentUserToken);
  let authDetails = {};
  if (!!id && !!token) {
    authDetails = { id: id, token: token };
  }
  const { data, error, isLoading } = useGetUserByIdQuery(authDetails);
  return (
    <header
      className={`${
        pathName !== "/" && "bg-blend-lighten border-b-stone-200"
      } bg-purple-700 flex  items-center place-items-center justify-between w-full max-w-full lg:px-32 md:px-12 px-8 sticky top-0 z-20 text-xl font-mono `}
    >
      <div className="flex items-center gap-x-12">
        <nav className="lg:pl-7 py-2 flex items-center gap-2 relative">
          <Link href={"/"}>
            <HiCollection className="h-10 w-10 text-purple-200" />{" "}
          </Link>
          <p className="text-2xl font-bold text-white">Stack</p>
        </nav>

        <nav className="flex items-center justify-between gap-x-3">
          <CustomLink href={"/home"} title={"Home"} className="max-md:hidden" />
          <CustomLink href={"/"} title={"Users"} className="max-md:hidden" />
          <CustomLink
            href={"/projects"}
            title={"Projects"}
            className="max-md:hidden"
          />
          <CustomLink
            href={"/tasks"}
            title={"Tasks"}
            className="max-md:hidden"
          />
          <CustomLink
            href={"/dashboard"}
            title={"Dashboard"}
            className="max-md:hidden"
          />
        </nav>
      </div>
      <nav className="flex items-center justify-between gap-x-5">
        <>
          <HiOutlineSearch className="h-5 w-5 text-white cursor-pointer" />
          <MdOutlineSettings className="h-5 w-5 text-white cursor-pointer" />
          <HiOutlineBell className="h-5 w-5 text-white cursor-pointer" />
          <div className="relative group">
            <Image
              src={isLoading ? dummyUser : data.data.avatar}
              height={35}
              width={35}
              alt="current user image"
              className="rounded-full border-2"
              priority
            />
            {!isLoading ? (
              <div className="hidden group-hover:block rounded-md absolute right-[-1rem] min-w-[130px] bg-white drop-shadow-lg">
                <p className="px-5 whitespace-nowrap py-3 border-b font-medium text-md rounded-t-md text-center hover:bg-[#F5F5F5]">
                  Hi, {data?.data.first_name}
                </p>
                <p
                  onClick={handleLogout}
                  className="px-5 py-3 font-medium text-center text-md rounded-b-md cursor-pointer hover:bg-red-600 hover:text-white"
                >
                  Logout
                </p>
              </div>
            ) : null}
          </div>
        </>
      </nav>
    </header>
  );
}

export default Navbar;
