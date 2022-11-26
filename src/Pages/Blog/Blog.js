import React from "react";
import Lottie from "lottie-react";
import blogHeader from "../../Assets/blog/blog.json";
import QueAns1 from "./QueAns1";
import QueAns2 from "./QueAns2";
import QueAns3 from "./QueAns3";
import QueAns4 from "./QueAns4";

const Blog = () => {
  return (
    <div className="dark:bg-gray-900">
      <header className="bg-gray-100 dark:bg-gray-800 py-10">
        <div className="w-1/2 lg:w-1/3 mx-auto">
          <Lottie animationData={blogHeader} loop={true} />
        </div>
      </header>
      <section className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pt-20 mb-10">
        <h2 className="text-4xl font-bold text-accent dark:text-info text-center border-t border-b py-5 dark:border-gray-700">
          Concept Clear Blog 
        </h2>
      </section>
      <section className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 pb-20">
        <QueAns1 />
        <QueAns4 />
        <QueAns2 />
        <QueAns3 />
      </section>
    </div>
  );
};

export default Blog;
