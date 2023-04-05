import { ICAL_URL } from "$env/static/private";
import { parse } from "ical.js";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch }) => {
  console.debug(`Fetching ical source from ${ICAL_URL}`);
  const response = await fetch(ICAL_URL);
  const data = await response.text();
  const jcal = parse(data);

  return new Response(JSON.stringify(jcal), {
    status: 200,
    headers: { "Content-Type": "application/calendar+json" },
  });
};
