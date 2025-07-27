import Stripe from "stripe";
import {Bookings } from "../models/bookings.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const id=paymentIntent.id
    const session=await stripe.checkout.sessions.list({
      payment_intent:id,
    })
    const {bookingId} = session.data[0].metadata;
    await Bookings.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"Stripe"})
  }
  else{
    console.log("unhandled event type:",event.type)
  }

  res.status(200).json({ received: true });
};
