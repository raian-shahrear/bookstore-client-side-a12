import React from 'react';
import HomeCategories from './HomeCategories';
import HomeHeader from './HomeHeader';

const Home = () => {
  return (
    <main className='dark:bg-gray-900'>
      <header>
        <HomeHeader />
      </header>
      <section className='px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl py-20'>
        <HomeCategories />
      </section>
    </main>
  );
};

export default Home;