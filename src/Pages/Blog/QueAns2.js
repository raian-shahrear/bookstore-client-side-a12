import React from "react";
import queAnsImg2 from "../../Assets/blog/QueAns2.png";

const QueAns2 = () => {
  return (
    <div>
      <div>
        <img
          src={queAnsImg2}
          alt="react"
          className="w-full h-80 object-cover object-center rounded-md"
        />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-400">
        How does prototypical inheritance work?
      </h3>
      <p className="text-gray-500 dark:text-base-100 mt-4">
      The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.
      </p>
      <p className="text-gray-500 dark:text-base-100 mt-1">
      By definition, null has no prototype, and acts as the final link in this prototype chain. It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like static dispatching do not exist in JavaScript.
      </p>
      
    </div>
  );
};

export default QueAns2;
