import { ICAL_URL } from "$env/static/private";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch }) => {
  console.debug(`Fetching ical source from ${ICAL_URL}`);
  return await fetch(ICAL_URL);
};
