<script lang="ts">
  import type { ComponentType } from "svelte";

  import Logo_ from "$lib/mrc-berlin.svg";
  import "$lib/tailwind.css";

  const Logo = Logo_ as unknown as ComponentType;

  export let angle: number;
</script>

<div
  style={`--angle: ${angle}; --sin: ${Math.sin((Math.PI / 180) * angle)}; --cos: ${Math.cos(
    (Math.PI / 180) * angle,
  )}`}
>
  <nav class="head fixed origin-center border-b-4 border-sky-500 bg-sky-300">
    <Logo class="m-auto h-full p-4" />
  </nav>
  <main class="main min-h-screen bg-sky-100">
    <slot />
  </main>
  <footer
    class="text-sky-600; fixed bottom-0 w-full border-t-2 border-sky-500 bg-sky-300 px-2 py-1"
  >
    Made in Berlin, for Berlin
  </footer>
</div>

<style lang="postcss">
  .head {
    width: calc(100% + var(--cos) * 2vw);
    height: calc(10rem + var(--sin) * 50vw);
    top: calc(var(--sin) * -50vw);
    left: calc(var(--cos) * -1vw);
    transform: rotate(calc(var(--angle) * -1deg));
    padding-top: calc(var(--sin) * 50vw);
  }

  .main {
    padding-top: calc(10rem + 50vw * var(--sin));
  }
</style>
