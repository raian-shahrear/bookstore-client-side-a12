import React from "react";
import queAnsImg3 from "../../Assets/blog/QueAns3.png";

const QueAns3 = () => {
  return (
    <div>
      <div>
        <img
          src={queAnsImg3}
          alt="react"
          className="w-full h-80 object-cover object-center rounded-md"
        />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-400">
      What is a unit test? Why should we write unit tests?
      </h3>
      <p className="text-gray-500 dark:text-base-100 mt-4">
      JavaScript Unit Testing is a method where JavaScript test code is written for a web page or web application module. It is then combined with HTML as an inline event handler and executed in the browser to test if all functionalities are working as desired. These unit tests are then organized in the test suite.
      </p>
      <p className="text-gray-500 dark:text-base-100 mt-1">
      When you start thinking about unit testing right at the start, it will help you structure your code better and achieve proper separation of concerns. You won't be tempted to assign multiple responsibilities to single code blocks as those would be a nightmare to unit-test.
      </p>
      
    </div>
  );
};

export default QueAns3;
