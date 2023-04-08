<script lang="ts">
  import { SkipNext, SkipPrevious } from "@steeze-ui/material-design-icons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import type { Time } from "ical.js";

  export let currentMonth: Time;
  export let months: Time[];

  $: atStart = months.at(0)?.compare(currentMonth) == 0;
  $: atEnd = months.at(-1)?.compare(currentMonth) == 0;
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

<div class="flex items-center justify-center gap-4 fill-sky-600 text-sky-600">
  <button
    on:click={() => go(-1)}
    title="Previous"
    class="h-10 rounded-md border border-sky-400 p-1 text-sky-400"
    class:inactive={atStart}
  >
    <Icon src={SkipPrevious} theme="twotone" />
  </button>
  <h2 class="w-32 text-center font-medium">{format.format(currentMonth.toJSDate())}</h2>
  <button
    on:click={() => go(+1)}
    title="Next"
    class="h-10 rounded-md border border-sky-400 p-1 text-sky-400"
    class:inactive={atEnd}
  >
    <Icon src={SkipNext} theme="twotone" />
  </button>
</div>

<style lang="postcss">
  .inactive {
    @apply cursor-not-allowed opacity-50;
    filter: blur(2px);
  }
</style>
