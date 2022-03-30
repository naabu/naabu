<script>
  import { t } from "svelte-intl-precompile";
  import DOMPurify from "dompurify";
  export let modules;
</script>

<div class="bg-gray-50">
  <main
    class="max-w-2xl mx-auto pt-2 pb-24 sm:pt-10 sm:px-6 lg:max-w-7xl lg:px-8"
  >
    <div
      class="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0"
    >
      <div class="flex sm:items-baseline sm:space-x-4">
        <h1
          class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
        >
          {$t("modules")}
        </h1>
      </div>
    </div>

    <section aria-labelledby="modules-heading" class="mt-6">
      <h2 id="modules-heading" class="sr-only">{$t("modules")}</h2>

      {#if modules && modules.length > 0}
        <div class="space-y-8">
          {#each modules as module, i}
            <div
              class="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
            >
              <div
                class="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8"
              >
                <div class="sm:flex lg:col-span-12">
                  <div
                    class="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40"
                  >
                    <a href="/module/{module.id}">
                      {@html DOMPurify.sanitize(module.moduleSvg)}
                    </a>
                  </div>

                  <div class="mt-6 sm:mt-0 sm:ml-6">
                    <h3 class="text-base font-medium text-gray-900">
                      <a
                        data-test="module-{i}-title-link"
                        href="/module/{module.id}">{module.moduleName}</a
                      >
                    </h3>
                    <p
                      class="module-description mt-3 text-sm text-gray-500 text-justify	"
                    >
                      {module.moduleDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        {$t("modules-not-found")}
      {/if}
    </section>
  </main>
</div>

<style>
  .module-description {
    text-indent: 16px;
  }
</style>
