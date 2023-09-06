import {
  createFlutterwavePayment,
  insertPayment,
  selectPayment,
  updatePayment,
} from "@lib/payment/utils";
import {
  formatApiRouteResponse,
  handleApiResponse,
  handleErrorResponse,
} from "@lib/utils";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  let body = {},
    response = {};
  try {
    body = await request.json();
    const tx_ref = uuidv4();
    response = handleApiResponse(
      await createFlutterwavePayment(new URL(request.url).origin, body, tx_ref)
    );
    const { amount, currency, delivery, customer, description } = body;
    const insert = await insertPayment(
      tx_ref,
      amount,
      currency,
      customer,
      delivery,
      description
    );
  } catch (e) {
    return handleErrorResponse(e, response);
  }
  return formatApiRouteResponse(response);
}

export async function GET(request) {
  let response = {
    status: 400,
    data: null,
  };
  const { searchParams } = new URL(request.url);
  const tx_ref = searchParams.get("tx_ref");
  try {
    const payment = await selectPayment(tx_ref);
    if (payment) {
      const callback_data = Object.fromEntries(searchParams);
      const update_callback = await updatePayment(tx_ref, {
        callback: JSON.stringify(callback_data),
      });
      const delivery = JSON.parse(payment.delivery);
      const amount = payment.amount;
      const currency = payment.currency;
      response = {
        status: 200,
        data: { ...callback_data, amount, currency, delivery },
      };
    }
  } catch (e) {
    return handleErrorResponse(e, response);
  }
  return formatApiRouteResponse(response);
}
