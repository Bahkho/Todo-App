import { useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
//-----------------------------------------------------------------------------------------
const Signout = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logOut = async () => {
    try {
      await logout(auth);
      navigate("/");
    } catch (err) {
      setError(err.message);
      // console.error(err);
    }
  };
  //-----------------------------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-8 justify-center items-center text-white max-w-[90%] md:max-w-[30%] mx-auto mt-8">
      <h1 className="font-bold underline">See You Next Time 👋🏾</h1>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        <b>Thank you for using our application.</b> We appreciate your time and
        trust in our platform. Feel free to return whenever you're ready to
        continue your journey with us. Remember, your data is safe and secure
        until you log in again. Have a great day!
      </p>

      <button
        className=" bg-green-700 px-4 py-2 w-full rounded"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Signout;
