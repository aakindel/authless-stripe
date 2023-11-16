import { MainNav } from "@/components/main-nav";
import { PricingCard } from "@/components/pricing-card";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-[1400px] items-center justify-center px-4 sm:px-8">
        <PricingCard />
      </div>
    </div>
  );
};

export default Home;
