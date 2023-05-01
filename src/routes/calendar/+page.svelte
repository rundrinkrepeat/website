<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";

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

  const onCopyUrl = (e: MouseEvent) => {
    if (!browser) {
      return;
    }
    const target = e.target as HTMLAnchorElement;
    navigator.clipboard.writeText(target.href);
    toast.push("URL copied to clipbard!", { duration: 3000 });
  };
</script>

<div class="mx-auto max-w-[65ch]">
  <div class="prose">
    <h1 class="mb-8 font-knewave font-normal text-sky-600">Running Calendar</h1>
  </div>
  {#if !selectedEvents || !$selectedEvents?.length}
    <div class="prose">
      <p>Enjoy browsing our social running calendar for the next twelve months.</p>
    </div>
    <Calendar calendar={ical} bind:selectedEvents />
    <div class="prose mt-4">
      <p>
        You can also subscribe this calendar in ICAL format, click <a
          href="/calendar/running.ical"
          on:click|preventDefault={onCopyUrl}>this link</a
        > to copy the URL to your clipbard to add to your calendar.
      </p>
    </div>
  {:else}
    <EventListHeader
      date={$selectedEvents[0].time.toJSDate()}
      on:close={() => ($selectedEvents = [])}
    />
    <div class="pt-4">
      <EventList events={$selectedEvents} />
    </div>
  {/if}
</div>
