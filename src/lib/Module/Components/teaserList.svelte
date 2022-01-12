<script>
  export let modules;
</script>

<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
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
          Lesmodules
        </h1>
      </div>
    </div>

    <!-- Products -->
    <section aria-labelledby="products-heading" class="mt-6">
      <h2 id="products-heading" class="sr-only">Lesmodules</h2>

      {#if modules}
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
                    {@html module.moduleSvg}
                    <!-- <img
                    src="https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg"
                    alt="Insulated bottle with white base and black snap lid."
                    class="w-full h-full object-center object-cover sm:w-full sm:h-full"
                  /> -->
                  </div>

                  <div class="mt-6 sm:mt-0 sm:ml-6">
                    <h3 class="text-base font-medium text-gray-900">
                      <a 
                      data-test="module-{i}-title-link"
                      href="/module/{module.id}">{module.moduleName}</a>
                    </h3>
                    <!-- <p class="mt-2 text-sm font-medium text-gray-900">$35.00</p> -->
                    <p
                      class="module-description mt-3 text-sm text-gray-500 text-justify	"
                    >
                      {module.moduleDescription}
                    </p>
                  </div>
                </div>

                <!-- <div class="mt-6 lg:mt-0 lg:col-span-5">
                  <dl class="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <dt class="font-medium text-gray-900">
                        Delivery address
                      </dt>
                      <dd class="mt-3 text-gray-500">
                        <span class="block">Floyd Miles</span>
                        <span class="block">7363 Cynthia Pass</span>
                        <span class="block">Toronto, ON N3Y 4H8</span>
                      </dd>
                    </div>
                    <div>
                      <dt class="font-medium text-gray-900">
                        Shipping updates
                      </dt>
                      <dd class="mt-3 text-gray-500 space-y-3">
                        <p>f•••@example.com</p>
                        <p>1•••••••••40</p>
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          >Edit</button
                        >
                      </dd>
                    </div>
                  </dl>
                </div> -->
              </div>
            </div>
          {/each}
        </div>
      {:else}
        Geen lesmodules gevonden
      {/if}
    </section>
  </main>
</div>

<style>
  .module-description {
    text-indent: 16px;
  }
</style>
