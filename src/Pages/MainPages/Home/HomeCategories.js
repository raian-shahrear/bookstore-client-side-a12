import React from 'react';
import "./Home.css";
import {Link} from "react-router-dom"
import cat1 from "../../../Assets/categories/education-book.png"
import cat2 from "../../../Assets/categories/children-book.png"
import cat3 from "../../../Assets/categories/technology-book.png"
import cat4 from "../../../Assets/categories/history-book.png"
import cat5 from "../../../Assets/categories/mystery-book.png"
import cat6 from "../../../Assets/categories/health-book.png"


const HomeCategories = () => {
  return (
    <div className='flex flex-wrap justify-between items-center gap-6'>
      <Link className='w-44 block'>
        <div className='bg-gray-200 hover: h-44 w-44 rounded-full flex justify-center items-center hover:bg-[#a8ceeb] custom-home'>
          <img src={cat1} alt="" className='w-28 h-28 z-10' />
        </div>
        <p className='text-lg text-center font-bold text-accent dark:text-info mt-3'>Education & Reference</p>
      </Link>

      <Link className='w-44 block'>
        <div className='bg-gray-200 hover: h-44 w-44 rounded-full flex justify-center items-center hover:bg-[#a8ceeb] custom-home'>
          <img src={cat2} alt="" className='w-28 h-28 z-10' />
        </div>
        <p className='text-lg text-center font-bold text-accent dark:text-info mt-3'>Children's Fantasy</p>
      </Link>

      <Link className='w-44 block'>
        <div className='bg-gray-200 hover: h-44 w-44 rounded-full flex justify-center items-center hover:bg-[#a8ceeb] custom-home'>
          <img src={cat3} alt="" className='w-28 h-28 z-10' />
        </div>
        <p className='text-lg text-center font-bold text-accent dark:text-info mt-3'>Technology & Research</p>
      </Link>

      <Link className='w-44 block'>
        <div className='bg-gray-200 hover: h-44 w-44 rounded-full flex justify-center items-center hover:bg-[#a8ceeb] custom-home'>
          <img src={cat4} alt="" className='w-28 h-28 z-10' />
        </div>
        <p className='text-lg text-center font-bold text-accent dark:text-info mt-3'>World History</p>
      </Link>

      <Link className='w-44 block'>
        <div className='bg-gray-200 hover: h-44 w-44 rounded-full flex justify-center items-center hover:bg-[#a8ceeb] custom-home'>
          <img src={cat5} alt="" className='w-28 h-28 z-10' />
        </div>
        <p className='text-lg text-center font-bold text-accent dark:text-info mt-3'>Mystery & Suspense</p>
      </Link>

      <Link className='w-44 block'>
        <div className='bg-gray-200 hover: h-44 w-44 rounded-full flex justify-center items-center hover:bg-[#a8ceeb] custom-home'>
          <img src={cat6} alt="" className='w-28 h-28 z-10' />
        </div>
        <p className='text-lg text-center font-bold text-accent dark:text-info mt-3'>Health & Fitness</p>
      </Link>
    </div>
  );
};

export default HomeCategories;