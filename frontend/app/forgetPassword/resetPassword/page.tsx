"use client";
import Link from "next/link";
import { FormEvent, use, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AxiosToastError from "@/utils/AxiosToastError";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function resetPassword(){
        if (!password || !confirmPassword) {
            toast.error("Please enter your new password and confirm it.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password & Confirm Password do not match.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
                email,
                password,
                confirmPassword
            });
            if (response.data.success) {
                toast.success("Password reset successfully!");
                router.replace("/login");
            } else {
                toast.error(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
            setPassword("");
            setConfirmPassword("");
        }
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Header Section */}
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
                    Reset Your Password
                </h1>
                <form onSubmit={handleOnSubmit} method="post" className="bg-white p-8 rounded w-full max-w-md">
                    <div className="mb-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-black text-sm mb-1">Enter Your Password</legend>
                            <input
                                type="password"
                                className="input "
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                            />
                        </fieldset>
                    </div>
                    <div className="mb-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-black text-sm mb-1">Confirm Your Password</legend>
                            <input
                            type="password"
                            className="input "
                            placeholder="Enter your password again"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                        />
                        </fieldset>
                    </div>
                    <div className="grid grid-cols-2 justify-center items-center gap-3">
                        <button type="submit" className="btn btn-primary w-full">
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        <button onClick={() => router.replace("/forgetPassword")} className="btn btn-active w-full">
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
