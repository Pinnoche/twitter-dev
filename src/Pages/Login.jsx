import { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";
import OTPVerification from "./OTPVerification";

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      setUser(result.user);
      setEmail(result.user.email);

      // Send user details (email) to Laravel backend for OTP handling
      const response = await axios.post(
        "http://localhost:8000/api/send-otp",
        {
          twitterEmail: "dimejiquadri2000@gmail.com",
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.message === "OTP sent to email successfully!") {
        setIsOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify-otp",
        {
          otp: otp,
          email: "dimejiquadri2000@gmail.com",
        },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.data.success) {
        setIsVerified(true);
        setIsOtpSent(false);
        alert("OTP Verified Successfully!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Login with Twitter
        </h2>

        {!isOtpSent && !isVerified && (
          <div className="text-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login with Twitter
            </button>
          </div>
        )}

        {isOtpSent && !isVerified && (
          <OTPVerification email={email} handleVerifyOTP={handleVerifyOTP} />
        )}

        {isVerified && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Welcome, {user.displayName}
            </h3>
            <p className="text-sm text-gray-500">Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
