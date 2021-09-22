<script>
  import ArrayDiff from "$lib/Diff/arrayDiff.svelte";
  import StringDiff from "$lib/Diff/stringDiff.svelte";
  export let revisionOld;
  export let revisionNew;
  $: console.log(revisionOld);
  $: console.log(revisionNew);
  let battleDiffers = false;
</script>

<StringDiff
  title="Titel"
  bind:old={revisionOld.title}
  bind:neww={revisionNew.title}
/>
<StringDiff
  title="Omschrijving"
  bind:old={revisionOld.description}
  bind:neww={revisionNew.description}
/>

<StringDiff
  title="Onderwerp"
  bind:old={revisionOld.unitopic}
  bind:neww={revisionNew.unitopic}
/>

<StringDiff
  title="from Text"
  bind:old={revisionOld.fromText}
  bind:neww={revisionNew.fromText}
/>

<ArrayDiff
  title="Onderwerpen"
  bind:old={revisionOld.multitopics}
  bind:neww={revisionNew.multitopics}
/>

<ArrayDiff
  title="Werkwoorden"
  bind:old={revisionOld.selectedVerbs}
  bind:neww={revisionNew.selectedVerbs}
/>

<ArrayDiff
  title="Bloom's taxonomy"
  bind:old={revisionOld.taxonomy_bloom}
  bind:neww={revisionNew.taxonomy_bloom}
/>

<StringDiff
  title="Solo's taxonomy"
  bind:old={revisionOld.taxonomy_solo}
  bind:neww={revisionNew.taxonomy_solo}
/>
