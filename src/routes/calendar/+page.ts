import ICal from "$lib/calendar";

import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const ical_response = await fetch("/calendar/running.ical");
  const ical = new ICal(await ical_response.text());

  return {
    ical,
  };
}) satisfies PageLoad;
