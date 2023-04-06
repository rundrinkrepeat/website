<script lang="ts">
  import { Time } from "ical.js";

  import CalendarHeader from "$lib/components/molecules/CalendarHeader.svelte";
  import CalendarMonth from "$lib/components/molecules/CalendarMonth.svelte";

  export let numMonths = 12;

  const startDate = new Date();
  const startMonth = Time.fromJSDate(startDate, false).startOfMonth();

  $: currentMonth = Time.fromJSDate(startDate, false);
  $: months = [...Array(numMonths).keys()].map((v, i) => {
    const entry = startMonth.clone();
    entry.month += v;
    return entry;
  });
</script>

<section>
  <main>
    <CalendarHeader bind:currentMonth {months} />
    <CalendarMonth {currentMonth} />
  </main>
</section>
