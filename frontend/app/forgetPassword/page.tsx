"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AxiosToastError from "@/utils/AxiosToastError";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

      async function forgetPasswordUsingEmail() {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forget-password`;
        if (!email) {
          toast.error("Please enter your email.");
          return;
        }
        try {
          setLoading(true);
          const response = await axios.post(url, { email }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          if (response.data.success) {
            toast.success(response.data.message || "OTP sent to your email!");
             router.push(`/forgetPassword/verify-otp?email=${encodeURIComponent(email)}`);
          } else {
            toast.error(response.data.message || "Failed to send OTP.");
          }
        } catch (error) {
          AxiosToastError(error);
        } finally {
          setLoading(false);
        }
      }

      const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        forgetPasswordUsingEmail();
      };

      const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="w-full max-w-md bg-white rounded-2xl p-8">
          <div className="flex justify-center mb-4">
            <img
              src="/job.jpg"
              alt="Job Board Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Job Board
        </h1>
        <h1 className="text-3xl text-black  font-bold mb-6 text-center">
          Forgot Your Password?
        </h1>
        <form onSubmit={handleOnSubmit} method="post" className="bg-white p-8 rounded w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              placeholder="Enter your email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className="grid grid-cols-2 justify-center items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <button onClick={() => router.replace("/login")} className="btn btn-active w-full">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
