<script lang="ts">
  import { Time } from "ical.js";

  import CalendarDay from "../atoms/CalendarDay.svelte";

  export let currentMonth: Time;
  export let startOfWeek: number = Time.MONDAY;

  const format = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  });

  let days: Time[] = [];
  $: {
    const daysInMonth = Time.daysInMonth(currentMonth.month, currentMonth.year);
    days = Array.from(
      { length: daysInMonth },
      (_, index) =>
        new Time({ year: currentMonth.year, month: currentMonth.month, day: index + 1 }),
    );
    const startDay = days[0].dayOfWeek(startOfWeek);
    for (let index = 0; index < startDay - 1; index++) {
      const day = days[0].clone();
      day.day -= 1;
      days.unshift(day);
    }
    for (let index = days.length; index < 6 * 7; index++) {
      const day = days.at(-1)!.clone();
      day.day += 1;
      days.push(day);
    }
  }
</script>

<ol
  class="grid h-full grid-cols-[repeat(7,fit-content(3ch))] place-content-center gap-4 font-knewave"
>
  {#each days.slice(0, 7) as day}
    <div class="text-center text-sky-400">{format.format(day.toJSDate())}</div>
  {/each}
  {#each days as day}
    <CalendarDay {day} {currentMonth} />
  {/each}
</ol>
