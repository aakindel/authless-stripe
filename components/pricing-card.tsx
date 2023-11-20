"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { distance, round } from "@/utils";
import React, { useState, useRef } from "react";
import Stripe from "stripe";
import axios from "axios";
import { Icons } from "./icons";

const PricingCardContent = ({
  stripeProduct,
}: {
  stripeProduct?: Stripe.Price;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePayment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    if (stripeProduct?.id) {
      const { data } = await axios.post(
        "/api/payment",
        {
          stripeProductID: stripeProduct.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.assign(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-xl font-bold sm:text-2xl">Simple Pricing</h3>
        <p className="leading-normal text-neutral-500 dark:text-neutral-400">
          Authless Stripe: pay without needing to log in.
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-xl border bg-neutral-200/60 px-5 py-10 dark:bg-neutral-800/60 sm:px-10">
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">
              {stripeProduct?.unit_amount &&
                `${(stripeProduct.unit_amount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}`}
            </h4>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              one-time payment
            </p>
          </div>
          <Button size="lg" disabled={isLoading} onClick={handlePayment}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Get Started
          </Button>
        </div>
      </div>
      <p className="max-w-[85%] font-semibold leading-normal text-neutral-500 dark:text-neutral-400 sm:leading-7">
        You can test the billing and won&apos;t be charged.
      </p>
    </React.Fragment>
  );
};

// adapted from https://stackrant.com/posts/tiltable-cards; https://buildui.com/recipes/spotlight
export const PricingCard = ({
  stripeProduct,
}: {
  stripeProduct?: Stripe.Price;
}) => {
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 });
  const [isAnimating, setAnimating] = useState(false);
  const isAnimatingReference = useRef(isAnimating);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const animate = (event: React.MouseEvent) => {
    setAnimating(true);

    const rect = event.currentTarget.getBoundingClientRect();

    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    mouseX.set(absolute.x);
    mouseY.set(absolute.y);

    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    setRotations({
      x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
      y: round(center.y / 16),
      z: round(distance(percent.x, percent.y, 50, 50) / 20),
    });
  };

  const stopAnimating = () => {
    setAnimating(false);

    setTimeout(() => {
      if (isAnimatingReference.current) return;

      setRotations({ x: 0, y: 0, z: 2 });
    }, 100);
  };

  return (
    <motion.div
      className="group flex h-auto w-full max-w-[500px] origin-center flex-col gap-4 rounded-xl bg-neutral-100 px-4 py-8 dark:bg-neutral-900 sm:px-8"
      onMouseMove={animate}
      onMouseLeave={stopAnimating}
      animate={{
        rotateY: rotations.x,
        rotateX: rotations.y,
        transformPerspective: rotations.z * 300,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "422px",
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px block rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 0, 0, 0.06),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px hidden rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.02),
              transparent 80%
            )
          `,
        }}
      />
      <PricingCardContent stripeProduct={stripeProduct} />
    </motion.div>
  );
};
