import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleApiResponse = (api_response) => {
  if (Number(api_response.status) !== 200)
    return {
      status: api_response.status,
      error: api_response.data,
    };
  return api_response;
};

export const formatErrorResponse = (e, response) => {
  console.error(`Error:-`, e);
  if (!response.error || Object.keys(response).length < 1)
    response = {
      status: 500,
      error: e.message,
    };
  return response;
};

export const formatFetchResponse = async (res) => {
  const status = await res.status;
  const data = await res.json();
  console.log(data);
  return {
    status,
    data,
  };
};

export const formatApiRouteResponse = (response) => NextResponse.json(response, { status: response.status });

export const handleErrorResponse = (e, response) => {
  response = formatErrorResponse(e, response);
  return formatApiRouteResponse(response)
}
