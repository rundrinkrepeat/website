<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import "@fontsource/knewave";
  import type { ComponentType } from "svelte";
  import { Hamburger } from "svelte-hamburgers";
  import { fly } from "svelte/transition";

  import Logo_ from "$lib/mrc-berlin.svg";
  import "$lib/tailwind.css";

  import SEO from "../atoms/SEO.svelte";

  const Logo = Logo_ as unknown as ComponentType;

  export let angle: number;
  export let menuAngle = 2 * angle;
  let isMenuOpen = false;

  $: if (browser) {
    const body = document.body;
    const classes = ["touch-none", "overflow-hidden", "overscroll-none"];
    if (isMenuOpen) {
      body.classList.add(...classes);
    } else {
      body.classList.remove(...classes);
    }
  }

  const routes = [
    { route: "/", title: "Home Page" },
    { route: "/calendar", title: "Calendar" },
  ];

  const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<SEO />
<div
  style={`--angle: ${angle}; --sin: ${Math.sin((Math.PI / 180) * angle)}; --cos: ${Math.cos(
    (Math.PI / 180) * angle,
  )}; --menuAngle: ${menuAngle}; --menuSin: ${Math.sin(
    (Math.PI / 180) * menuAngle,
  )}; --menuCos: ${Math.cos((Math.PI / 180) * menuAngle)}`}
>
  <header class="head fixed z-20 flex justify-between border-b-4 border-sky-500 bg-sky-300">
    <a href="/">
      <Logo
        class="ml-4 h-full p-4 transition-transform duration-500 hover:rotate-[360deg] hover:scale-105"
      />
    </a>
    <div class="mr-4 self-end">
      <Hamburger bind:open={isMenuOpen} --color="rgb(14 165 233)" type="elastic" />
    </div>
  </header>
  {#if isMenuOpen}
    <nav class="absolute z-10 h-screen w-full overflow-hidden">
      <div
        transition:fly={{ delay: 200, duration: 750, y: "-100%" }}
        class="menu flex items-center justify-center"
      >
        <div class="text-sky-500">
          <h1 class="mb-4 border-b border-b-sky-500 font-knewave text-3xl">Hello, Berlin!</h1>
          <ol class="text-xl font-semibold" on:click={toggleMenu} on:keypress={toggleMenu}>
            {#each routes as route}
              <li>
                <a href={route.route} class:saturate-50={route.route == $page.route.id}
                  >{route.title}</a
                >
              </li>
            {/each}
          </ol>
        </div>
      </div>
    </nav>
  {/if}
  <main class="main mb-8 min-h-screen bg-sky-100">
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
    width: calc(var(--cos) * 100vw + var(--sin) * 10rem);
    height: calc(var(--sin) * 100vw + var(--cos) * 10rem);
    left: calc(-1 * var(--sin) * var(--cos) * 10rem);
    top: calc(-1 * var(--sin) * var(--cos) * 50vw);
    transform: rotate(calc(var(--angle) * -1deg));
  }

  .menu {
    width: calc(var(--menuCos) * 100vw + var(--menuSin) * 100vh);
    height: calc(var(--menuCos) * 100vh + var(--menuSin) * 100vw);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(calc(var(--menuAngle) * 1deg));
    padding-top: 13rem;
    @apply absolute bg-sky-300;
  }

  .main {
    padding-top: calc(10rem + var(--sin) / var(--cos) * 100vw);
  }
</style>
