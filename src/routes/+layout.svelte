<script lang="ts">
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import AngledHeader from "$lib/components/templates/AngledHeader.svelte";
</script>

<AngledHeader angle={2}><slot /></AngledHeader>
<SvelteToast />
