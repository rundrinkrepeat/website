<script lang="ts">
  import ical from "ical.js";

  import CalendarHeader from "$lib/components/molecules/CalendarHeader.svelte";
  import CalendarMonth from "$lib/components/molecules/CalendarMonth.svelte";

  const { Time } = ical;

  export let numMonths = 12;

  const startDate = new Date();
  const startMonth = Time.fromJSDate(startDate, false).startOfMonth();

  $: currentMonth = Time.fromJSDate(startDate, false);
  $: months = [...Array(numMonths).keys()].map((v, i) => {
    const entry = startMonth.clone();
    entry.month += v;
    return entry;
  });
  $: atStart = months.at(0)?.compare(currentMonth) == 0;
  $: atEnd = months.at(-1)?.compare(currentMonth) == 0;

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

  type SwipeTouchEvent = TouchEvent & { currentTarget: EventTarget & HTMLDivElement };

  let firstTouch: Touch | undefined;
  let swipeTreshold = 100;
  let swipe: "left" | "right" | undefined;
  const onTouchStart = (e: SwipeTouchEvent) => {
    firstTouch = e.touches[0];
  };
  const onTouchMove = (e: SwipeTouchEvent) => {
    if (!firstTouch) return;
    const diffX = e.touches[0].clientX - firstTouch.clientX;
    if (diffX <= -swipeTreshold) {
      swipe = "left";
    } else if (diffX >= swipeTreshold) {
      swipe = "right";
    } else {
      swipe = undefined;
    }
  };
  const onTouchEnd = (e: SwipeTouchEvent) => {
    if (!firstTouch) return;
    if (swipe !== undefined) {
      go(swipe == "left" ? 1 : -1);
    }
    firstTouch = undefined;
    swipe = undefined;
  };
</script>

<section>
  <main>
    <div class="mb-4">
      <CalendarHeader bind:currentMonth {go} {atStart} {atEnd} />
    </div>
    <div
      on:touchstart|stopPropagation={onTouchStart}
      on:touchmove|stopPropagation={onTouchMove}
      on:touchend|stopPropagation={onTouchEnd}
    >
      <div
        class:translate-x-40={swipe == "right"}
        class:-translate-x-40={swipe == "left"}
        class="transition-transform"
      >
        <CalendarMonth {currentMonth} />
      </div>
    </div>
  </main>
</section>
