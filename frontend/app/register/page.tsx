"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Header from '@/components/Header';
import { toast } from "react-toastify";
import axios from "axios";
import AxiosToastError from "@/utils/AxiosToastError";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ZodError } from "zod";

const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["employee", "jobseeker", "agency"] as const, {
    message: "Please select a valid role",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();

  const [data, setData] = useState({
    fullName: "", 
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const registeredUsers = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(response.data.message || "Registration successful!");
      setData({ fullName: "", email: "", password: "", confirmPassword: "", role: "" });
      router.push('/login');

    } catch (error: any) {
      AxiosToastError(error);
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    registerSchema.parse(data);
    setErrors({});
    await registeredUsers();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (key && typeof key === "string") fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
};

  return (
    <>
      <Header title="Register"/>
      <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 px-15">

          <div className="flex justify-center mb-2">
            <img
              src="/job.jpg"
              alt="Job Board Logo"
              className="w-15 h-15 object-contain"
            />
          </div>

          <h1 className="text-xl font-bold text-center text-gray-800">Job Board</h1>
          <p className="text-sm text-gray-500 text-center mb-3">Create your account</p>

          <form onSubmit={handleOnSubmit} method="post" className="space-y-3">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleOnChange}
                placeholder="John Doe"
                className="w-full rounded-lg text-black border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

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
              <label className="block text-sm font-medium text-black mb-1">Password</label>
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                placeholder="Enter your password again"
                className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
              <select
                name="role"
                value={data.role}
                onChange={handleOnChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option disabled value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="jobseeker">Jobseeker</option>
                <option value="agency">Agency</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Register
            </button>
          </form>

          <p className="text-xs text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
