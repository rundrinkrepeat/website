<script lang="ts">
  import ical from "ical.js";
  import type { Time as TimeType } from "ical.js";

  import { type EventList, daysForMonth } from "$lib/calendar";
  import CalendarDay from "$lib/components/atoms/CalendarDay.svelte";

  const { Time } = ical;

  export let currentMonth: TimeType;
  export let startOfWeek: number = Time.MONDAY;
  export let events: EventList;

  const format = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  });

  $: days = daysForMonth(currentMonth, startOfWeek);
</script>

<ol
  class="grid h-full select-none grid-cols-[repeat(7,fit-content(3ch))] place-content-center gap-2 font-knewave lg:gap-4"
>
  {#each days.slice(0, 7) as day}
    <div class="text-center text-sky-400">{format.format(day.toJSDate())}</div>
  {/each}
  {#each days as day}
    <CalendarDay {day} {currentMonth} events={events.eventsForDay(day)} />
  {/each}
</ol>
