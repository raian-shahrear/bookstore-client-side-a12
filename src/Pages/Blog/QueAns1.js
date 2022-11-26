import React from "react";
import queAnsImg1 from "../../Assets/blog/QueAns1.png";

const QueAns1 = () => {
  return (
    <div>
      <div>
        <img
          src={queAnsImg1}
          alt="react"
          className="w-full h-80 object-cover object-center rounded-md"
        />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-400">
        What are the different ways to manage a state in a React application?
      </h3>
      <p className="text-gray-500 text-lg font-medium dark:text-base-100 mt-4">
        There are four main types of state there need to properly manage in
        React apps:
      </p>
      <ol className="list-decimal mt-1 text-gray-500 text-base dark:text-base-100 ml-4">
        <li>
          <span className="font-medium">Local state:</span> Local state is data
          we manage in one or another component. Local state is most often
          managed in React using the useState hook.
        </li>
        <li>
          <span className="font-medium">Global state:</span> Global state is
          data we manage across multiple components. Global state is necessary
          when we want to get and update data anywhere in our app, or in
          multiple components at least.
        </li>
        <li>
          <span className="font-medium">Server state:</span> Data that comes
          from an external server that must be integrated with our UI state.
          Server state is a simple concept, but can be hard to manage alongside
          all of our local and global UI state.
        </li>
        <li>
          <span className="font-medium">URL state:</span> Data that exists on
          our URLs, including the pathname and query parameters. URL state is
          often missing as a category of state, but it is an important one. In
          many cases, a lot of major parts of our application rely upon
          accessing URL state.
        </li>
      </ol>
    </div>
  );
};

export default QueAns1;
