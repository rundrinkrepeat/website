<script lang="ts">
  import type { Time } from "ical.js";

  export let currentMonth: Time;
  export let months: Time[];

  const format = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  const go = (offset: number) => {
    let targetMonth = currentMonth.clone();
    targetMonth.month += offset;
    const start = months.at(0);
    const end = months.at(-1);
    if (start && targetMonth.compare(start) == -1) {
      targetMonth = start;
    }
    if (end && targetMonth.compare(end) == +1) {
      targetMonth = end;
    }

    currentMonth = targetMonth;
  };
</script>

<div class="flex justify-between">
  <button on:click={() => go(-1)}>Prev</button>
  <h2>{format.format(currentMonth.toJSDate())}</h2>
  <button on:click={() => go(+1)}>Next</button>
</div>
