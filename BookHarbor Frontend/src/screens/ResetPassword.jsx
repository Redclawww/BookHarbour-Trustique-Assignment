import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://book-harbor.onrender.com/api/reset-password/${id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json.success);
    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      alert("Password changed successfully");
      navigate("/login");
    }
  };

  const onChange = async (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset your password
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="passsword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                  onChange={onChange}
                  value={credentials.password}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border"
                onClick={handleSubmit}
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
