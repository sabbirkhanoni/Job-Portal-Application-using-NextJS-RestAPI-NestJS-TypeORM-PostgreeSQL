"use client";
import AxiosToastError from "@/utils/AxiosToastError";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

function VerifyOTPContent() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  async function resendOTP() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forget-password`;
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      setLoadingResend(true);
      const response = await axios.post(url, { email }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent to your email!");
      } else {
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingResend(false);
    }
  }

  async function VerifyOTP() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`;
    try {
      if (!email || !otp) {
        toast.error("Please go back and enter your email.");
        return;
      }
      setLoading(true);
      const response = await axios.post(url, { email, otp }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message || "OTP verified successfully!");
        router.push('/forgetPassword/resetPassword?email=' + encodeURIComponent(email));
      } else {
        toast.error(response.data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      AxiosToastError(error);
    }finally {
      setLoading(false);
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    VerifyOTP();
  }

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
            Verify OTP
        </h1>
        <form onSubmit={handleOnSubmit} method="post" className="bg-white p-8 rounded w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP Code
            </label>
            <input
              type="text"
              id="otp"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              placeholder="Enter your OTP code"
              value={otp}
              onChange={handleOnChange}
            />
          </div>
          <div className="grid grid-cols-2 justify-center items-center gap-3">
            <button type="submit" className="btn btn-primary w-full">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={resendOTP}
              className="btn btn-secondary w-full">
              {loadingResend ? "Sending..." : "Resend OTP"}
            </button>
          </div>
          <button onClick={() => router.replace("/login")} className="btn btn-active mt-2 w-full">
              Back
          </button>
        </form>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyOTPContent />
    </Suspense>
  );
}
