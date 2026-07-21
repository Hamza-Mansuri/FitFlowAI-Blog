import User from "../models/User.js";

import Admin from "../models/Admin.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import sendEmail from "../utils/sendEmail.js";

import crypto from "crypto";


// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check User collection first
    let user = await User.findOne({ email });
    let role = "user";
    let isMatch = false;

    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
      role = user.role || "user";
      if (email && email.toLowerCase() === "admin@gmail.com") {
        role = "admin";
      }
    } else {
      // If not found in User, check Admin collection
      const admin = await Admin.findOne({ email });
      if (admin) {
        isMatch = await bcrypt.compare(password, admin.password);
        user = admin;
        role = "admin";
      }
    }

    if (!user || !isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Forgot Pssword
export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash OTP
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.resetOTP = hashedOTP;
    user.resetOTPExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    user.resetVerified = false;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "FitFlowAI Password Reset OTP",
      html: `
      <div style="max-width:600px;margin:auto;padding:40px;background:#ffffff;font-family:Arial,sans-serif;border-radius:12px;border:1px solid #e5e7eb">

        <h2 style="color:#16a34a;text-align:center;margin-bottom:20px;">
          FitFlowAI
        </h2>

        <h3 style="text-align:center;color:#111827;">
          Password Reset Request
        </h3>

        <p style="color:#374151;font-size:16px;">
          Hello <strong>${user.name}</strong>,
        </p>

        <p style="color:#374151;font-size:16px;line-height:1.7;">
          We received a request to reset your password.
        </p>

        <div style="margin:30px auto;text-align:center;">

          <span
            style="
            display:inline-block;
            background:#16a34a;
            color:white;
            padding:16px 40px;
            border-radius:10px;
            font-size:30px;
            letter-spacing:8px;
            font-weight:bold;
            "
          >
            ${otp}
          </span>

        </div>

        <p style="text-align:center;color:#6b7280;">
          This OTP will expire in
          <strong>10 minutes</strong>.
        </p>

        <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;">

        <p style="font-size:13px;color:#9ca3af;text-align:center;">
          If you didn't request a password reset,
          simply ignore this email.
        </p>

      </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Verify Otp
export const verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.resetOTP || !user.resetOTPExpires) {
      return res.status(400).json({
        message: "No OTP request found.",
      });
    }

    if (user.resetOTPExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired.",
      });
    }

    const isValid = await bcrypt.compare(
      otp,
      user.resetOTP
    );

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    user.resetVerified = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


//Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.resetVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your OTP first.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // Clear OTP data
    user.resetOTP = null;
    user.resetOTPExpires = null;
    user.resetVerified = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);

    user.resetOTP = hashedOTP;
    user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.resetVerified = false;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "FitFlowAI - New Password Reset OTP",
      html: `
      <div style="font-family:Arial,sans-serif;padding:30px;background:#f4f4f4">
        <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px">
          <h2 style="color:#16a34a;text-align:center">
            FitFlowAI
          </h2>

          <p>Hello <strong>${user.name}</strong>,</p>

          <p>You requested a new OTP for resetting your password.</p>

          <div style="
            margin:30px auto;
            width:220px;
            text-align:center;
            font-size:34px;
            font-weight:bold;
            letter-spacing:8px;
            color:#16a34a;
            padding:18px;
            border:2px dashed #16a34a;
            border-radius:12px;
          ">
            ${otp}
          </div>

          <p>This OTP is valid for <strong>10 minutes</strong>.</p>

          <p>If you didn't request this, simply ignore this email.</p>

          <hr>

          <p style="font-size:13px;color:gray">
            © FitFlowAI
          </p>
        </div>
      </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "A new OTP has been sent.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// VERIFY ADMIN TOKEN
export const verifyAdmin = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    res.status(200).json(req.user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const testEmail = async (req, res) => {
  try {

    await sendEmail({
      to: req.body.email,
      subject: "FitFlowAI Email Test",
      html: `
        <h2>Hello from FitFlowAI</h2>
        <p>If you're reading this, Nodemailer is working perfectly.</p>
      `,
    });

    res.json({
      success: true,
      message: "Email Sent Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};