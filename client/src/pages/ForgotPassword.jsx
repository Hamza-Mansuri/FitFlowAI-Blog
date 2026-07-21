import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaEnvelope,
    FaRunning,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";

import PageTransition from "../components/common/PageTransition";
import GlowBackground from "../components/common/GlowBackground";
import SEO from "../components/common/SEO";

import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    // 1 = Email
    // 2 = OTP
    // 3 = Reset Password
    // 4 = Success

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [timer, setTimer] = useState(600);

    const [verifying, setVerifying] = useState(false);

    const otpString = otp.join("");

    const inputRefs = useRef([]);

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [resetLoading, setResetLoading] = useState(false);

    const navigate = useNavigate();

    const sendOTP = async () => {
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        try {
            setLoading(true);

            const { data } = await API.post("/auth/forgot-password", {
                email,
            });

            toast.success(data.message);

            setTimer(600);

            setStep(2);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async () => {
        try {

            setLoading(true);

            const { data } = await API.post("/auth/resend-otp", {
                email,
            });

            toast.success(data.message);

            setTimer(600);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to resend OTP."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleOTPChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOTP = [...otp];

        newOTP[index] = value;

        setOtp(newOTP);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1].focus();
        }

    };

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const newOTP = pasted.split("");

        while (newOTP.length < 6) {
            newOTP.push("");
        }

        setOtp(newOTP);

    };

    const verifyOTP = async () => {

        if (otpString.length !== 6) {
            toast.error("Enter all 6 digits.");
            return;
        }

        try {

            setVerifying(true);

            const { data } = await API.post("/auth/verify-otp", {

                email,

                otp: otpString,

            });

            toast.success(data.message);

            setStep(3);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid OTP"
            );

        } finally {

            setVerifying(false);

        }

    };

    useEffect(() => {
        if (step !== 2) return;

        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timer, step]);

    const passwordStrength = (() => {

        let score = 0;

        if (newPassword.length >= 8) score++;

        if (/[A-Z]/.test(newPassword)) score++;

        if (/[0-9]/.test(newPassword)) score++;

        if (/[^A-Za-z0-9]/.test(newPassword)) score++;

        switch (score) {

            case 0:
            case 1:
                return {
                    width: "25%",
                    color: "bg-red-500",
                    label: "Weak",
                };

            case 2:
                return {
                    width: "50%",
                    color: "bg-yellow-500",
                    label: "Medium",
                };

            case 3:
                return {
                    width: "75%",
                    color: "bg-blue-500",
                    label: "Good",
                };

            default:
                return {
                    width: "100%",
                    color: "bg-green-500",
                    label: "Strong",
                };
        }

    })();

    const resetPassword = async () => {

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {

            setResetLoading(true);

            const { data } = await API.post("/auth/reset-password", {
                email,
                newPassword,
            });

            toast.success(data.message || "Password reset successfully!");

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to reset password."
            );

        } finally {

            setResetLoading(false);

        }

    };

    return (
        <PageTransition>
            <SEO
                title="Forgot Password | FitFlowAI"
                description="Recover your FitFlowAI account securely."
            />

            <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-50/50 px-4 py-16 dark:bg-[#05070d]">

                <GlowBackground />

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="relative z-10 w-full max-w-md rounded-3xl premium-glass-card border border-slate-200/60 p-8 shadow-xl dark:border-slate-800/40"
                >
                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-600 text-white shadow-lg">
                            <FaRunning className="text-3xl" />
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Forgot Password
                        </h1>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Recover access to your FitFlowAI account.
                        </p>

                    </div>

                    <AnimatePresence mode="wait">

                        {step === 1 && (

                            <motion.div
                                key="email"
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25 }}
                            >

                                <div className="relative">

                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <FaEnvelope />
                                    </span>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white/60 py-3.5 pl-11 pr-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white"
                                    />

                                </div>

                                <button
                                    type="button"
                                    onClick={sendOTP}
                                    className="text-sm font-semibold text-green-600 hover:underline"
                                >
                                    Send OTP
                                </button>

                            </motion.div>

                        )}

                        {step === 2 && (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25 }}
                            >
                                <div className="mb-6 text-center">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Verify OTP
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        We've sent a 6-digit verification code to
                                    </p>

                                    <p className="mt-1 font-semibold text-green-600 break-all">
                                        {email}
                                    </p>
                                </div>

                                <div
                                    onPaste={handlePaste}
                                    className="flex justify-center gap-2"
                                >
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            value={digit}
                                            maxLength={1}
                                            onChange={(e) =>
                                                handleOTPChange(e.target.value, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                            className="
            h-14
            w-12
            rounded-2xl
            border
            border-slate-300
            bg-white
            text-center
            text-xl
            font-bold
            outline-none
            transition

            focus:border-green-500
            focus:ring-4
            focus:ring-green-500/10

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
          "
                                        />
                                    ))}
                                </div>

                                <div className="mt-6 text-center">

                                    <p className="text-sm text-slate-500">

                                        OTP expires in

                                    </p>

                                    <p className="mt-1 text-lg font-bold text-green-600">

                                        {String(Math.floor(timer / 60)).padStart(2, "0")}:
                                        {String(timer % 60).padStart(2, "0")}

                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={verifyOTP}
                                    disabled={verifying}
                                    className="
        mt-6
        flex
        w-full
        justify-center
        rounded-2xl
        bg-gradient-to-r
        from-green-500
        to-emerald-600
        py-3.5
        font-semibold
        text-white
        transition
        hover:scale-[1.01]
      "
                                >
                                    {verifying ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>

                                <div className="mt-6 text-center">

                                    {timer > 0 ? (
                                        <p className="text-sm text-slate-500">
                                            Resend OTP available after{" "}
                                            <span className="font-semibold">
                                                {String(Math.floor(timer / 60)).padStart(2, "0")}:
                                                {String(timer % 60).padStart(2, "0")}
                                            </span>
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={resendOTP}
                                            className="text-sm font-semibold text-green-600 hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    )}

                                </div>

                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="reset"
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25 }}
                            >
                                <div className="mb-6 text-center">

                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Create New Password
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Your new password must be different from your previous password.
                                    </p>

                                </div>

                                {/* New Password */}

                                <div className="mb-4 relative">

                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 px-4 pr-12 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>

                                </div>

                                {/* Confirm Password */}

                                <div className="relative">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 px-4 pr-12 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>

                                </div>

                                {/* Password Strength */}

                                <div className="mt-4">

                                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

                                        <div
                                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                            style={{
                                                width: passwordStrength.width,
                                            }}
                                        />

                                    </div>

                                    <p className="mt-2 text-sm font-medium text-slate-500">
                                        Strength :
                                        <span className="ml-1">
                                            {passwordStrength.label}
                                        </span>
                                    </p>

                                </div>

                                {/* Password Match */}

                                {confirmPassword && (

                                    <p
                                        className={`mt-3 text-sm font-medium ${newPassword === confirmPassword
                                            ? "text-green-600"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {newPassword === confirmPassword
                                            ? "✓ Passwords match"
                                            : "Passwords do not match"}
                                    </p>

                                )}

                                <button
                                    type="button"
                                    onClick={resetPassword}
                                    disabled={resetLoading}
                                    className="mt-6 flex w-full justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 font-semibold text-white transition hover:scale-[1.01]"
                                >
                                    {resetLoading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>

                            </motion.div>
                        )}

                    </AnimatePresence>

                    <div className="mt-8 text-center">

                        <Link
                            to="/login"
                            className="text-sm font-medium text-green-500 hover:underline"
                        >
                            Back to Login
                        </Link>

                    </div>

                </motion.div>

            </div>
        </PageTransition>
    );
}

export default ForgotPassword;