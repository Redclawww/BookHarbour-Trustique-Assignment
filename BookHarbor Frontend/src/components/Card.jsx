/* eslint-disable react/prop-types */

const Card = (props) => {
  console.log(props);
  return (
    <>
      <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
        <img
          className="rounded-xl"
          src="https://images.unsplash.com/photo-1547517023-7ca0c162f816"
          alt=""
        />
        <div className="flex justify-between items-center">
          <div>
            <h1 className="mt-5 text-2xl font-semibold">{props.data.title}</h1>
            <p className="mt-2">Author: {props.data.author}</p>
            <p className="mt-2">Genre: {props.data.genre}</p>
            <p className="mt-2">${props.data.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
