import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-[1400px] items-center justify-center px-4 sm:px-8">
        <div className="flex h-auto w-full max-w-[500px] flex-col gap-4 rounded-xl bg-neutral-100 px-4 py-8 dark:bg-neutral-900 sm:px-8">
          <div className="flex w-full flex-col gap-2">
            <h3 className="text-xl font-bold sm:text-2xl">Simple Pricing</h3>
            <p className="leading-normal text-neutral-500 dark:text-neutral-400">
              Authless Stripe: pay without needing to log in.
            </p>
          </div>
          <div className="grid w-full items-start gap-10 rounded-xl border bg-neutral-200/60 p-10 dark:bg-neutral-800/60">
            <div className="flex flex-col gap-4 text-center">
              <div>
                <h4 className="text-7xl font-bold">$25</h4>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  one-time payment
                </p>
              </div>
              <Link href="#" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
              </Link>
            </div>
          </div>
          <p className="max-w-[85%] font-semibold leading-normal text-neutral-500 dark:text-neutral-400 sm:leading-7">
            You can test the billing and won&apos;t be charged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
