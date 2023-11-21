"use client";

import { MainNav } from "@/components/main-nav";
import { PricingCard } from "@/components/pricing-card";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Stripe from "stripe";
import axios from "axios";

const Home: NextPage = () => {
  const [stripeProducts, setStripeProducts] = useState<Stripe.Price[]>([]);

  useEffect(() => {
    fetchStripeProducts();
  }, []);

  const fetchStripeProducts = async () => {
    const { data } = await axios.get("/api/get-products");
    setStripeProducts(data);
    console.log(data);
  };

  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-[1400px] items-center justify-center px-4 sm:px-8">
        {stripeProducts.length ? (
          stripeProducts.map((stripeProduct) => (
            <PricingCard key={stripeProduct.id} stripeProduct={stripeProduct} />
          ))
        ) : (
          <PricingCard
            stripeProduct={
              {
                unit_amount: 2500,
              } as Stripe.Price
            }
          />
        )}
      </div>
    </div>
  );
};

export default Home;
