<script lang="ts">
  export let title: string | null = null;
  export let description: string | null = null;

  $: _title = title ? ` | ${title}` : "";
</script>

<svelte:head>
  <title>MRC Berlin{_title}</title>
  {#if description}<meta name="description" content={description} />{/if}
</svelte:head>
