import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { getStringWithBackslash } from "@/utils";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
  const data = await request.json();
  const stripeProductID = data.stripeProductID;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: stripeProductID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${getStringWithBackslash(
      process.env.NEXT_PUBLIC_APP_URL ?? ""
    )}authless?success=true`,
    cancel_url: `${getStringWithBackslash(
      process.env.NEXT_PUBLIC_APP_URL ?? ""
    )}authless?canceled=true`,
  });

  return NextResponse.json(session.url);
}
