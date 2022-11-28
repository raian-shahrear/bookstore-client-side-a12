import React from "react";
import HomeAdvertisement from "./HomeAdvertisement";
import HomeCategories from "./HomeCategories";
import HomeFAQ from "./HomeFAQ";
import HomeHeader from "./HomeHeader";
import HomeReview from "./HomeReview";
import { useQuery } from "@tanstack/react-query";
import PrimarySpinner from "../../../Components/Spinners/PrimarySpinner";

const Home = () => {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/books-isAdvertised`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <PrimarySpinner />;
  }

  return (
    <main className="dark:bg-gray-900">
      <header>
        <HomeHeader />
      </header>
      <section className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl py-20">
        <HomeCategories />
      </section>
      {books?.length > 0 && (
        <section className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pb-20">
          <HomeAdvertisement books={books} />
        </section>
      )}
      <section className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pb-20">
        <HomeReview />
      </section>
      <section className="px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pb-20">
        <HomeFAQ />
      </section>
    </main>
  );
};

export default Home;
