import React, { useContext } from "react";
import { UserContext } from "../../../Contexts/AuthContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  // const [isAdmin, adminLoading] = useAdmin(user?.email);
  return (
    <div>
      <h2 className="text-4xl font-bold text-center mt-48 lg:my-60 lg:flex justify-center items-center text-gray-900 dark:text-gray-200">
        <p>
          Welcome <span className="text-primary dark:text-info mx-2">{user?.displayName}</span>{" "}
          to Your DashBoard
        </p>
      </h2>
    </div>
  );
};

export default Dashboard;
