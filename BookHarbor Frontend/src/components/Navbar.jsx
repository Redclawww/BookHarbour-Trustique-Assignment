import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className=" border-gray-200 ">
        <div className="max-w-screen flex flex-wrap items-center justify-between py-4 px-20 ">
          <Link to="/" className="flex items-center">
            <span className="self-center text-3xl font-semibold whitespace-nowrap italic text-black">
              Book Harbour
            </span>
          </Link>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-5"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li>
                  <Link
                    to="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 "
                    aria-current="page"
                  ></Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="flex gap-5">
              {!localStorage.getItem("authToken") ? (
                <div className="flex gap-5">
                  <Link
                      to="/Login"
                      
                    ><button className=" text-gray-900 font-bold py-2 px-4 rounded-full border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white hover:scale-105 transition-all">
                    <div className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent ">
                      Login
                    </div>
                  </button>
                  </Link>
                  <Link
                      to="/signup"
                    >
                  <button className=" text-white font-bold py-2 px-4 rounded-full bg-transparent border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white hover:scale-105 transition-all">
                    <div className="block py-2 pl-3 pr-4 text-gray-900 rounded">
                      Signup
                    </div>
                  </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    className="bg-[#DB1B22]  text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
