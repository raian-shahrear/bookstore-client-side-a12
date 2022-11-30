import React, { useContext } from "react";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";
import { UserContext } from "../../../Contexts/AuthContext";
import useAdmin from "../../../Hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isAdmin, adminLoading] = useAdmin(user?.email);

  if (adminLoading) {
    <PrimarySpinner />;
  }
  return (
    <div>
      <h2 className="text-4xl font-bold text-center mt-48 lg:ml-32 lg:my-60 lg:flex justify-center items-center text-gray-900 dark:text-gray-200">
        {!adminLoading && isAdmin ? (
          <div>
            <p>
              Hello{" "}
              <span className="text-primary mx-2">{user?.displayName}</span>
            </p>
            <p className="mt-6">Welcome to Admin Dashboard</p>
          </div>
        ) : (
          <p>
            Welcome{" "}
            <span className="text-primary mx-2">{user?.displayName}</span> to
            Your DashBoard
          </p>
        )}
      </h2>
    </div>
  );
};

export default Dashboard;
