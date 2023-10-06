import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookListing = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const response = await fetch("https://book-harbor.onrender.com/api/listbook", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: credentials.title,
        author: credentials.author,
        genre: credentials.genre,
        price: credentials.price,
        token: token,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Oops, Couldn't list your book");
    }
    if (json.success) {
      navigate("/");
    }
  };

  const onChange = async (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <form className="w-1/2 border p-6 rounded-3xl">
        <div className="mb-6 ">
          <label
            htmlFor="Title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={onChange}
            type="text"
            name="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter book title"
            required
            value={credentials.title}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author
          </label>
          <input
            onChange={onChange}
            value={credentials.author}
            type="text"
            name="author"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="genre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Genre
          </label>
          <input
            onChange={onChange}
            value={credentials.genre}
            type="text"
            name="genre"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            onChange={onChange}
            value={credentials.price}
            type="text"
            name="price"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default BookListing;
