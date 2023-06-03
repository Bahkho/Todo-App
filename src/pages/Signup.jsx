import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, googlelogin, confirmEmail } = useAuth();
  //-----------------------------------------------------------------------------------------

  const signUp = async () => {
    try {
      const userCredential = await createUser(email, password);
      await confirmEmail(userCredential.user);
      alert("Check Your Mail For Verification To Sign In");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  //-----------------------------------------------------------------------------------------
  const signInWithGoogle = async () => {
    try {
      await googlelogin();
      navigate("/todo");
    } catch (error) {
      setError(error.message);
      // console.error(error);
    }
  };

  //-----------------------------------------------------------------------------------------
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full">
        <div className="flex flex-col gap-8 justify-center items-center text-white max-w-[1280px] mx-auto">
          <h1 className="font-bold">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email"
            placeholder="Email..."
            className="p-2 w-[90%] md:w-[30%] text-black rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            className="p-2 w-[90%] md:w-[30%] text-black rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col w-[90%] gap-2 md:flex-row justify-between md:w-[30%]">
            <button
              className=" bg-green-700 px-4 py-2 rounded text-sm"
              onClick={signUp}
            >
              Sign Up With Your Email
            </button>
            <button
              className=" bg-green-700 px-4 py-2 rounded text-sm"
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </button>
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-black">
              Sign in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
