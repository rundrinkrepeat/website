<script lang="ts">
  import type { Event as EventType, Time as TimeType } from "ical.js";

  export let events: { time: TimeType; event: EventType }[];
</script>

{#each events as event}
  <article>
    <h2 class="text-lg">{event.event.summary}</h2>
    <div class="prose">
      {@html event.event.description}
    </div>
  </article>
{/each}
