import React from "react";

const HomeFAQ = () => {
  return (
    <div>
      <section className="bg-gray-100 dark:bg-gray-800 text-accent dark:text-base-100 rounded-md">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">
            How it works
          </p>
          <h2 className="mb-8 text-4xl font-bold text-center text-accent dark:text-info">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
            <div>
              <h3 className="font-semibold text-xl">
                Do we deliver books all over the world?
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Of course, Yes. We provide shipment services globally. Not only that, along with we offer some special gift, if anyone will buy more than $100.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">Do we offer money back policy?</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                If anyone want to cancel an order and want money back, he/she should cancel the order within 24 hours. Because, we are so dedicated to reach your product first. However, after shipment, you need to pay only shipping cost. We will consider the product price. 
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">All books of Bookstore are old?</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
              The books are old but in excellent condition. We do not sell defective products to disappoint you. When you get the books, you will feel like they are new. We always say, Read More, Less Spend.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl">Do we accept global payment system?</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                We offer the books to our global customer and yes, we accept all card like Mastercard, Visa-card, American Express, Discover and Paypal. So, keep buy your favorite books.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFAQ;
