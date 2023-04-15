<script lang="ts">
  import { Close } from "@steeze-ui/material-design-icons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { createEventDispatcher } from "svelte";

  export let date: Date;

  const dispatch = createEventDispatcher<{ close: void }>();

  const format = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const close = () => dispatch("close");
</script>

<header class="flex fill-sky-600 text-sky-600" on:click={close} on:keypress={close}>
  <h1 class="grow font-knewave text-2xl">
    {format.format(date)}
  </h1>
  <button class="h-8"><Icon src={Close} theme="twotone" /></button>
</header>
