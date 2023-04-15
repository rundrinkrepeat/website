<script lang="ts">
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";

  import { browser } from "$app/environment";

  import ICal from "$lib/calendar";
  import EventListHeader from "$lib/components/molecules/EventListHeader.svelte";
  import Calendar, { type Selected } from "$lib/components/organisms/Calendar.svelte";
  import EventList from "$lib/components/organisms/EventList.svelte";

  let ical: ICal | undefined;
  onMount(async () => {
    if (browser) {
      const ical_response = await fetch("/calendar/running.ical");
      ical = new ICal(await ical_response.text());
    }
  });

  let selectedEvents: Selected;
</script>

<div class="mx-auto max-w-[65ch]">
  <div class="prose mb-8">
    <h1 class="font-knewave font-normal text-sky-600">Running Calendar</h1>
    <p>Enjoy browsing our social running calendar for the next twelve months.</p>
  </div>
  <Calendar calendar={ical} bind:selectedEvents />
  <div class="prose mt-4">
    <p>
      You can also subscribe this calendar in ICAL format, just follow this link: <a
        href="/calendar/running.ical">running.ical</a
      >
    </p>
  </div>
</div>
{#if selectedEvents && $selectedEvents?.length}
  <div transition:fade class="absolute left-0 top-0 z-10 h-full w-full bg-sky-300 p-4">
    <EventListHeader
      date={$selectedEvents[0].time.toJSDate()}
      on:close={() => ($selectedEvents = [])}
    />
    <div class="pt-4">
      <EventList events={$selectedEvents} />
    </div>
  </div>
{/if}
