<script lang="ts">
  import type { Time } from "ical.js";

  export let element = "li";
  export let day: Time;
  export let currentMonth: Time;
</script>

<svelte:element
  this={element}
  class="flex h-10 w-10 items-center justify-center rounded-md border border-sky-400 text-sky-400"
  class:inactive-day={day.year != currentMonth.year || day.month != currentMonth.month}
  class:active-day={day.year == currentMonth.year && day.month == currentMonth.month}
>
  <time class="inline-block">{day.day}</time>
</svelte:element>

<style lang="postcss">
  .inactive-day {
    @apply cursor-default opacity-50;
    filter: blur(2px);
  }

  .active-day {
    @apply cursor-pointer;
  }
</style>
