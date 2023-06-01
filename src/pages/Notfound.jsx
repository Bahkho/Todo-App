import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold">Page not found!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        quisquam facere provident doloremque cum est enim asperiores sequi
        possimus suscipit?
      </p>
      <p>
        Go to{" "}
        <Link to="/" className=" text-black">
          Homepage
        </Link>
        .
      </p>
    </div>
  );
}
