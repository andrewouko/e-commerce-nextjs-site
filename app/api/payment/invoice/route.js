import { createFlutterwavePayment, insertPayment } from "@lib/payment/utils";
import { formatErrorResponse, handleApiResponse } from "@lib/utils";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  /* let body = {},
    response = {};
  try {
    body = await request.json();
    const tx_ref = uuidv4();
    response = handleApiResponse(await createFlutterwavePayment((new URL(request.url).origin), body, tx_ref));
    const { amount, currency, delivery, customer } = body;
    insertPayment(tx_ref, amount, currency, customer, delivery)
  } catch (e) {
    response = formatErrorResponse(e, response);
    return NextResponse.json(response, { status: response.status });
  }
  return NextResponse.json(response, { status: response.status }); */
}
