<script lang="ts">
  import "@fontsource/knewave";
  import type { ComponentType } from "svelte";
  import { Hamburger } from "svelte-hamburgers";
  import { Svrollbar } from "svrollbar";

  import { fly } from "svelte/transition";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  import SEO from "$lib/components/atoms/SEO.svelte";
  import Logo_ from "$lib/mrc-berlin.svg";
  import "$lib/tailwind.css";

  const Logo = Logo_ as unknown as ComponentType;

  export let angle: number;
  export let menuAngle = 2 * angle;
  $: constants = {
    "--angle": angle,
    "--sin": Math.sin((Math.PI / 180) * angle),
    "--cos": Math.cos((Math.PI / 180) * angle),
    "--menuAngle": menuAngle,
    "--menuSin": Math.sin((Math.PI / 180) * menuAngle),
    "--menuCos": Math.cos((Math.PI / 180) * menuAngle),
  };

  let isMenuOpen = false;
  let scrollViewport: Element;
  let scrollContents: Element;

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
  style={Object.entries(constants)
    .map(([key, value]) => `${key}: ${value}`)
    .join(";")}
>
  {#if isMenuOpen}
    <nav class="fixed z-10 h-screen w-full overflow-hidden">
      <div
        transition:fly={{ delay: 200, duration: 750, y: "-100%" }}
        class="menu flex items-center justify-center bg-sky-300"
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
  <header class="relative z-20 h-40">
    <div class="head fixed flex justify-between border-b-4 border-sky-500 bg-sky-300">
      <a href="/">
        <Logo
          class="ml-4 h-full p-4 transition-transform duration-500 hover:rotate-[360deg] hover:scale-105"
        />
      </a>
      <div class="mr-4 self-end">
        <Hamburger bind:open={isMenuOpen} --color="rgb(14 165 233)" type="elastic" />
      </div>
    </div>
  </header>
  <main class="absolute bottom-0 top-40 w-full bg-sky-200">
    <div class="main-viewport h-full overflow-y-scroll" bind:this={scrollViewport}>
      <div class="flex h-full grow flex-col" bind:this={scrollContents}>
        <div class="grow px-2">
          <slot />
        </div>
        <footer class="border-t-2 border-sky-500 bg-sky-300 px-2 py-1 text-xs text-sky-600">
          Made in Berlin, for Berlin
        </footer>
      </div>
      <Svrollbar contents={scrollContents} viewport={scrollViewport} />
    </div>
  </main>
</div>

<style lang="postcss">
  .head {
    width: calc(var(--cos) * 100vw + 2 * var(--sin) * 10rem);
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
    padding-top: 0rem;
    @apply absolute;
  }

  .main-viewport {
    padding-top: calc(var(--sin) / var(--cos) * 100vw);
    -ms-overflow-style: none;
    scrollbar-width: none;
    --svrollbar-thumb-width: 10px;
    --svrollbar-thumb-background: linear-gradient(45deg, #ec4f27, orange);
    --svrollbar-thumb-opacity: 1;
    --svrollbar-thumb-radius: 0;
  }

  .main-viewport::-webkit-scrollbar {
    display: none;
  }
</style>
