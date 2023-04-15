<script lang="ts">
  import type { Event, Time } from "ical.js";
  import { getContext } from "svelte";

  import { type Selected, contextKey } from "$lib/components/organisms/Calendar.svelte";

  export let element = "li";
  export let day: Time;
  export let currentMonth: Time;
  export let events: { time: Time; event: Event }[];

  const selected: Selected = getContext(contextKey);
</script>

<svelte:element
  this={element}
  on:click={() => {
    $selected = events;
  }}
  class="flex h-10 w-10 items-center justify-center rounded-md border border-sky-400 text-sky-400 lg:h-14 lg:w-14"
  class:border-4={events.length}
  class:inactive-day={day.year != currentMonth.year || day.month != currentMonth.month}
  class:cursor-pointer={events.length}
>
  <time class="inline-block">{day.day}</time>
</svelte:element>

<style lang="postcss">
  .inactive-day {
    @apply opacity-50;
    filter: blur(2px);
  }
</style>
