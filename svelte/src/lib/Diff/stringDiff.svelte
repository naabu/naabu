<script>
  export let old = "";
  export let neww = "";
  export let title = "difference";
  let differs = false;

  $: {
    differs = false;
    if (old !== neww) {
      differs = true;
    }
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
            <div 
              data-cy="{title}-old"
            >
              {old}
            </div>

            <div data-cy="{title}-new">
              {neww}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
