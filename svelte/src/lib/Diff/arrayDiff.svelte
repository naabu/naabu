<script>
  export let title = "Verschil";
  export let old;
  export let neww;

  $:console.log(old);
  $:console.log(neww);

  let differs = false;

  $: if (old && neww) {
    differs = checkArrayIsTheSame(old, neww);
  }

  function checkArrayIsTheSame(arrayToCheckOld, arrayToCheckNew) {
    console.log('checkArray');
    if (arrayToCheckOld.length !== arrayToCheckNew.length) {
      return true;
    }

    for (let i = 0; i < arrayToCheckOld.length; i++) {
      if (arrayToCheckOld[i] !== arrayToCheckNew[i]) {
        return true;
      }
    }
    return false;
  }
</script>

{#if differs}
<div class="bg-gray-100">
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="max-w-none mx-auto">
      <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow">
        <div class="bg-white border-b border-gray-200 px-4 py-5 sm:px-6">
          <div class="flex space-x-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">
                {title}
              </p>
            </div>
            <div class="flex-shrink-0 self-center flex">

            </div>
          </div>
        </div>

        <div class="grid gap-4 grid-cols-2 opacity-25 px-4 pb-5 sm:p-6 sm:pt-0">
          
          <div>
            {#each old as item}
            <div>
                {item}
            </div>
            {/each}
          </div>
         
          <div>
            {#each neww as item}
            <div>
                {item}
            </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/if}