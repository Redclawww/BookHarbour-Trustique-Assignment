// import { Link } from "react-router-dom";
const Card = () => {
  return (
    <>

  <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
    <img className="rounded-xl" src="https://images.unsplash.com/photo-1547517023-7ca0c162f816" alt="" />
    <div className="flex justify-between items-center">
      <div>
        <h1 className="mt-5 text-2xl font-semibold">Aloe Cactus</h1>
        <p className="mt-2">Author: Jk Rowling</p>
        <p className="mt-2">Genre: Fantasy</p>
        <p className="mt-2">$11.99</p>
      </div>
      <div>
        <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">Buy Now</button>
      </div>
    </div>
  </div>

    </>
  )  
  };

export default Card;
