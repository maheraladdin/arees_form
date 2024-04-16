import Stripe from "stripe";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {

    const {email, price, currency} = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
        typescript: true
    });

    const customers = await stripe.customers.list();

    let customer = customers.data.find(customer => customer.email === email);

    if(!customer) {
        customer = await stripe.customers.create({
            email,
        });
    }

    if(!customer) {
        return NextResponse.json({
            message: "Could not create customer"
        });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create({
        customer: customer?.id,
    }, {apiVersion: "2023-10-16"});

    const paymentIntent = await stripe.paymentIntents.create({
        amount: (price || 10) * 100,
        currency: currency || "usd",
        customer: customer?.id,
        payment_method_types: ["card"],
    });

    return NextResponse.json({
        paymentIntent,
        ephemeralKey,
        customerId: customer?.id,
    });

}