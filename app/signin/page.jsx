"use client";
import Link from "next/link";
import { HiCollection } from "react-icons/hi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { useState } from "react";
import { useLoginMutation } from "@/components/Redux/Slices/apiSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/components/Redux/Slices/authSlice";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const result = await login({ ...data });
      if (result?.data) {
        const { token } = result.data;
        dispatch(
          setCredentials({
            id: Math.floor(Math.random() * 9) + 1,
            token: token,
          })
        );

        toast.success("Successfull!");
        router.push("/");
      } else if (result?.error) {
        localStorage.removeItem("userToken");
        toast.error(result.error.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-full justify-center items-center flex-col py-10">
      <section className="bg-white w-full max-w-md shadow-2xl rounded-md py-16">
        <div className="px-10 py-6">
          <div className="flex items-center gap-4">
            <HiCollection className="h-12 w-12 text-purple-800" />
            <p className="font-bold text-gray-600 text-4xl ">Stack</p>
          </div>
          <p className="text-xl text-gray-700 font-semibold py-5">
            Sign In to continue with Stack
          </p>

          <div className="flex w-full flex-col py-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <label htmlFor="email" className="flex flex-col gap-2 w-full">
                <p className="font-bold">Email</p>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors?.email && (
                  <p
                    className="pl-1 pt-2 flex items-center gap-2 text-base text-red-500"
                    role="alert"
                  >
                    <BiError /> {errors.email.message}
                  </p>
                )}
              </label>
              <label
                htmlFor="password"
                className="w-full flex flex-col gap-2 mt-3 relative"
              >
                <p className="font-bold">Password</p>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type={showPassword === false ? "password" : "text"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Please Enter your password.",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <div className="cursor-pointer text-2xl absolute right-3 top-12 z-10">
                  {showPassword === false ? (
                    <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                {errors?.password && (
                  <p
                    className="pl-1 pt-2 flex items-center gap-2 text-base text-red-500"
                    role="alert"
                  >
                    <BiError /> {errors.password.message}
                  </p>
                )}
              </label>
              <button className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 active:scale-[.98] ease-in-out transform active:duration-100 transition-all hover:scale-[1.01] flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span className="">Sign In</span>
              </button>
              <p className="mt-6 text-base text-gray-400 font-semibold">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className=" text-blue-500 font-bold">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignIn;
