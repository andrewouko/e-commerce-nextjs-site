import { formatFetchResponse } from "@lib/utils";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createFlutterwavePayment = async (request_origin, data, tx_ref) => {
  const required_props = ["amount", "currency", "customer", "delivery"];
  const isValid = required_props.every((prop) => data.hasOwnProperty(prop));
  if (!isValid)
    throw new Error(
      `The following props are required. ${JSON.stringify(required_props)}`
    );

  const { amount, currency, delivery: meta, customer, description } = data;

  const redirect_url = `${request_origin}/subscription/redirect`;

  const customizations = {
    title: "YooKatale Subscription Payment",
    logo: `https://www.yookatale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.54d97587.png&w=384&q=75`,
    description
  };

  const payment_options = `mobilemoneyuganda, card, credit`

  const res = await fetch(`https://api.flutterwave.com/v3/payments`, {
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      tx_ref,
      amount,
      currency,
      redirect_url,
      meta,
      customer,
      customizations,
      payment_options
    }),
  });
  return formatFetchResponse(res)
};

export const insertPayment = async (tx_ref, amount, currency, customer, delivery, description) => {

    return await prisma.payment.create({
        data: {
            tx_ref,
            amount: parseFloat(amount),
            currency,
            customer: JSON.stringify(customer),
            delivery: JSON.stringify(delivery),
            date: new Date(),
            description
        }
    })

}

export const selectPayment = async (tx_ref) => {

    return await prisma.payment.findUnique({
        where: {
            tx_ref
        }
    })

}

export const updatePayment = async (tx_ref, data) => {

    return await prisma.payment.update({
        where: {
            tx_ref
        },
        data
    })

}
