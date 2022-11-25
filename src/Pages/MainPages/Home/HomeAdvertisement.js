import React from "react";

const HomeAdvertisement = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-accent dark:text-info text-center mb-8">
        Top Collections
      </h2>

      <div className="relative w-full flex gap-4 py-6 overflow-x-auto">
        <img
          className="h-48 aspect-video rounded-sm object-cover object-center bg-gray-500"
          src="https://source.unsplash.com/random/241x361/?1"
          alt="Image 1"
        />
        <img
          className="h-48 aspect-video rounded-sm object-cover object-center bg-gray-500"
          src="https://source.unsplash.com/random/241x361/?2"
          alt="Image 2"
        />
        <img
          className="h-48 aspect-video rounded-sm object-cover object-center bg-gray-500"
          src="https://source.unsplash.com/random/241x361/?3"
          alt="Image 3"
        />
        <img
          className="h-48 aspect-video rounded-sm object-cover object-center bg-gray-500"
          src="https://source.unsplash.com/random/241x361/?4"
          alt="Image 4"
        />
        <img
          className="h-48 aspect-video rounded-sm object-cover object-center bg-gray-500"
          src="https://source.unsplash.com/random/241x361/?5"
          alt="Image 5"
        />
      </div>
    </div>
  );
};

export default HomeAdvertisement;
