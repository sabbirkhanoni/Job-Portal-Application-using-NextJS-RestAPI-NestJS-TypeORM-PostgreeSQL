"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Header from '@/components/Header';
import AxiosToastError from "@/utils/AxiosToastError";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookie } from "next-cookie";
import { useRouter } from "next/navigation"; 
import { z, ZodError } from "zod";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const cookie = useCookie("jwtToken");
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  async function loginUser() {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.data.access_token;

      cookie.set('jwtToken', token, {
        maxAge: 24 * 60 * 60,
        sameSite: 'strict',
        httpOnly: true,
      });

      if (response.data.error) {
        toast.error(response.data.message || "Login failed!");
        return;
      }

      toast.success(response.data.message || "Login successful!");

      // Redirect based on role
      const role = response.data.data.user.role;
      if (role === "admin") {
        router.push('/dashboard');
      } else {
        router.push('/empDashboard');
      }

    } catch (error: any) {
      AxiosToastError(error);
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginSchema.parse(data);
      setErrors({});
      await loginUser();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <Header title="Login"/>
      <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

          <div className="flex justify-center mb-4">
            <img
              src="/job.jpg"
              alt="Job Board Logo"
              className="w-20 h-20 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800">Job Board</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Login to your account</p>

          <form onSubmit={handleOnSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="text-right">
              <Link
                href="/forgetPassword"
                className="text-xs text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}