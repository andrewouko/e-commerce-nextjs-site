import {
  insertMessage,
  sendSMS,
  sendTwitterDirectMessage,
  sendWhatsAppMessage,
} from "@lib/invite/utils";
import { formatErrorResponse, handleApiResponse } from "@lib/utils";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const invitation_message = `Hey, I am using YooKatale 
Forget about going to the market. 
Enjoy low cost discounted products 
And never miss A meal with
Your friends and family.

Join here https://www.yookatale.com/contact
YooKatale, Here for you.`;

export async function POST(request, { params }) {
  const { channel } = params;
  let body = {}, response = {}, sendMessage = (recipient, message, message_id) => {};
  try {
    body = await request.json();
    if (!body.recipient) {
      response = {
        status: 400,
        error: "Recipient property is required",
      };
      throw new Error(response.error);
    }
    switch (channel.toLowerCase()) {
      case "whatsapp":
        sendMessage = sendWhatsAppMessage;
        break;
      case "sms":
        sendMessage = sendSMS;
        break;
      case "twitter":
        sendMessage = sendTwitterDirectMessage;
        break;
      default:
        response = {
          error: "Invalid channel provided",
          status: 400,
        };
        throw new Error(response.error);
    }
    const message_id = `${channel}-${uuidv4()}`;
    response = handleApiResponse(
      await sendMessage(body.recipient, invitation_message, message_id)
    );
    const insert = await insertMessage(message_id, invitation_message, body.recipient, channel)
  } catch (e) {
    response = formatErrorResponse(e, response)
    return NextResponse.json(response, { status: response.status });
  }

  return NextResponse.json(response, { status: response.status });
}
