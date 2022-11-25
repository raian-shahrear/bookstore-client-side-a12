import React from 'react';
import HomeAdvertisement from './HomeAdvertisement';
import HomeCategories from './HomeCategories';
import HomeFAQ from './HomeFAQ';
import HomeHeader from './HomeHeader';
import HomeReview from './HomeReview';

const Home = () => {
  return (
    <main className='dark:bg-gray-900'>
      <header>
        <HomeHeader />
      </header>
      <section className='px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl py-20'>
        <HomeCategories />
      </section>
      <section className='px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pb-20'>
        <HomeAdvertisement />
      </section>
      <section className='px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pb-20'>
        <HomeReview />
      </section>
      <section className='px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl pb-20'>
        <HomeFAQ />
      </section>
    </main>
  );
};

export default Home;