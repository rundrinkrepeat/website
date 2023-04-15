<script lang="ts">
  import { onMount } from "svelte";

  import { browser } from "$app/environment";

  import ICal from "$lib/calendar";
  import Calendar from "$lib/components/organisms/Calendar.svelte";

  let ical: ICal | undefined;
  onMount(async () => {
    if (browser) {
      const ical_response = await fetch("/calendar/running.ical");
      ical = new ICal(await ical_response.text());
    }
  });
</script>

<div class="mx-auto max-w-[65ch]">
  <div class="prose mb-8">
    <h1 class="font-knewave font-normal text-sky-600">Running Calendar</h1>
    <p>Enjoy browsing our social running calendar for the next twelve months.</p>
  </div>
  <Calendar calendar={ical} />
  <div class="prose mt-4">
    <p>
      You can also subscribe this calendar in ICAL format, just follow this link: <a
        href="/calendar/running.ical">running.ical</a
      >
    </p>
  </div>
</div>
