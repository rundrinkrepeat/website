<script lang="ts">
  import Calendar from "$lib/components/organisms/Calendar.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mx-auto max-w-[65ch]">
  <div class="prose mb-8">
    <h1 class="font-knewave font-normal text-sky-600">Running Calendar</h1>
    <p>Enjoy browsing our social running calendar for the next twelve months.</p>
  </div>
  <Calendar calendar={data.ical} />
  <div class="prose mt-4">
    <p>
      You can also subscribe this calendar in ICAL format, just follow this link: <a
        href="/calendar/running.ical">running.ical</a
      >
    </p>
  </div>
</div>
