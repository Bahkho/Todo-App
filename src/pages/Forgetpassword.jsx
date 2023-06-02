import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Forgetpassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const reset = async () => {
    try {
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
      // <Navigate to="/homepage" replace={true} />;
    } catch (error) {
      setError(error.message);
      // console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full">
        <div className="flex flex-col gap-8 justify-center items-center text-white">
          <h1 className="font-bold">Password Reset</h1>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email"
            placeholder="Email..."
            className="p-2 w-[90%] md:w-[30%] text-black rounded "
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className=" bg-green-700 px-4 py-2 w-[90%] md:w-[30%] rounded"
            onClick={reset}
          >
            Reset Password
          </button>
          <p>
            <Link to="/login" className="text-black">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
