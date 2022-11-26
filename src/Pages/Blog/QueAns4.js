import React from "react";
import queAnsImg4 from "../../Assets/blog/QueAns4.png";

const QueAns4 = () => {
  return (
    <div>
      <div>
        <img
          src={queAnsImg4}
          alt="react"
          className="w-full h-80 object-cover object-center rounded-md"
        />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-400">
        React vs. Angular vs. Vue
      </h3>
      <div className="mt-4">
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-accent uppercase bg-gray-200 dark:text-gray-200 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3 px-2 w-10"></th>
                <th scope="col" className="py-3 px-2 w-1/4">
                  Attribute
                </th>
                <th scope="col" className="py-3 px-2 w-1/4">
                  Angular
                </th>
                <th scope="col" className="py-3 px-2 w-1/4">
                  React
                </th>
                <th scope="col" className="py-3 px-2 w-1/4">
                  Vue
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b">
                <th
                  scope="row"
                  className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                >
                  1.
                </th>
                <td className="p-2">Startup time</td>
                <td className="p-2">Longer due to its larger codebase</td>
                <td className="p-2">Quick</td>
                <td className="p-2">Quick</td>
              </tr>
              <tr className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b">
                <th
                  scope="row"
                  className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                >
                  2.
                </th>
                <td className="p-2">Data binding</td>
                <td className="p-2">Bi-directional</td>
                <td className="p-2">Uni-direction</td>
                <td className="p-2">Bi-directional</td>
              </tr>
              <tr className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b">
                <th
                  scope="row"
                  className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                >
                  3.
                </th>
                <td className="p-2">Complete web app</td>
                <td className="p-2">
                  Can be used on standalone basis by its additional tools
                </td>
                <td className="p-2">
                  Need to be integrated with many other tools
                </td>
                <td className="p-2">Requires third party tools</td>
              </tr>
              <tr className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b">
                <th
                  scope="row"
                  className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                >
                  4.
                </th>
                <td className="p-2">Popularity on Google Trends</td>
                <td className="p-2">34%</td>
                <td className="p-2">75%</td>
                <td className="p-2">18%</td>
              </tr>
              <tr className="bg-white text-accent dark:bg-gray-600 dark:text-gray-200 border-b">
                <th
                  scope="row"
                  className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                >
                  5.
                </th>
                <td className="p-2">Companies use tech</td>
                <td className="p-2">
                  YouTube, Office, GMail, Udemy, PayPal, Linkedin
                </td>
                <td className="p-2">
                  Facebook, Instagram, Whatsapp, Twitter, Netflix
                </td>
                <td className="p-2">Alibaba, Adobe, Reuters, Xiaomi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueAns4;
