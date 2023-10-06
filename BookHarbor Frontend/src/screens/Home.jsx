import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [bookData, setbookData] = useState([]);

  const loadData = async () => {
    const response = await fetch("https://book-harbor.onrender.com/api/bookdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();

    setbookData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(bookData);
  function handleSubmit() {
    if (localStorage.getItem("authToken")) {
      navigate("/Booklisting");
    } else {
      alert("You need to be logged in first");
    }
  }

  return (
    <div className="">
      <Navbar />
      <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-500  flex items-center justify-center mx-5 rounded-3xl flex-col gap-6">
        <h1 className="text-5xl font-extrabold text-white">
          Sell your books now
        </h1>
        <button
          onClick={handleSubmit}
          className="border-2 px-5 py-3 rounded-3xl text-white hover:text-cyan-500 hover:bg-white hover:scale-110 transition-all"
        >
          List your book
        </button>
      </div>
      <div className="flex items-center justify-center mx-5 rounded-3xl gap-6 my-10 p-5 border-black border-2 flex-col">
        <p className="text-5xl font-extrabold text-cyan-500">Book Shelf</p>
        <input
          className=" w-3/4 peer text-sm text-black px-10 py-3 bg-cyan-200 rounded-3xl border-none"
          type="search"
          id="search"
          value={search}
          placeholder="Search for books"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="w-full flex flex-wrap">
          {bookData.length !== 0 ? (
            bookData
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((book, index) => <Card key={index} data={book} />)
          ) : (
            <h2>Someone Stole the books</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
