<script>
  export let title = "Verschil";
  export let old;
  export let neww;
  export let old2 = null;
  export let neww2 = null;

  let differs = false;

  $: if (old && neww) {
    differs = checkArrayIsTheSame(old, neww, old2, neww2);
  }

  function checkArrayIsTheSame(
    arrayToCheckOld,
    arrayToCheckNew,
    arrayToCheckOld2,
    arrayToCheckNew2
  ) {
    if (arrayToCheckOld.length !== arrayToCheckNew.length) {
      return true;
    }

    for (let i = 0; i < arrayToCheckOld.length; i++) {
      if (arrayToCheckOld[i] !== arrayToCheckNew[i]) {
        return true;
      }
    }

    if (old2 && neww2) {
      if (arrayToCheckOld2.length !== arrayToCheckNew2.length) {
        return true;
      }

      for (let i = 0; i < arrayToCheckOld2.length; i++) {
        if (arrayToCheckOld2[i] !== arrayToCheckNew2[i]) {
          return true;
        }
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
              <div class="flex-shrink-0 self-center flex" />
            </div>
          </div>

          <div class="grid gap-4 grid-cols-2 mt-4 px-4 pb-5 sm:p-6 sm:pt-0">
            <div>
              {#each old as item, index}
                <div>
                  {item} - 
                  {#if old2}
                    {old2[index]}
                  {/if}
                </div>
              {/each}
            </div>

            <div>
              {#each neww as item, index}
                <div>
                  {item}
                  {#if neww2} -
                    {neww2[index]}
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
