import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HomeCategories = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  useEffect( ()=>{
    axios
    .get(`${process.env.REACT_APP_HOST_LINK}/categories`)
    .then((data) =>setCategories(data.data))
    .catch((err) => console.error(err));
  }, [])

  const handleNavigation = (category) => { 
    navigate(`/books/${category._id}`, {state: category });
  }

  return (
    <div className="flex flex-wrap justify-between gap-6">
      {categories?.map((category) => (
        <button key={category?._id} onClick={()=> handleNavigation(category)} className="w-44 h-full block custom-home-cat">
          <div className="bg-gray-100 dark:bg-gray-300 h-44 w-44 rounded-full flex justify-center items-center">
            <img src={category?.image} alt="category" className="w-28 h-28 z-10" />
          </div>
          <p className="text-lg text-center font-bold text-accent dark:text-base-100 mt-3 custom-home-p">
            {category?.categoryName}
          </p>
        </button>
      ))}
    </div>
  );
};

export default HomeCategories;
