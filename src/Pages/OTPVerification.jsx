import { useState } from "react";
const OTPVerification = ({ email, handleVerifyOTP }) => {
    const [otp, setOtp] = useState("");
  
    const verifyOtp = async () => {
      const result = await handleVerifyOTP(otp);
      if (!result.success) {
        alert("Invalid OTP. Please try again.");
      }
    };
  
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">OTP Verification</h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={verifyOtp}
          className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Verify OTP
        </button>
      </div>
    );
  };
  
export default OTPVerification;
