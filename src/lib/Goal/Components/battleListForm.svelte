<script>
  export let battles;
  export let index;
  let newBattleName = "";

  function addBattleSubmit() {
    let newBattleObject = {
      name: newBattleName,
      quizzes: [],
    };
    if (newBattleName.length > 0) {
      battles = [...battles, newBattleObject];
    }
    newBattleName = "";

  }

  function removeBattle(battleToRemoveIndex) {
    battles.splice(battleToRemoveIndex, 1);
    battles = battles;
    index = 0;
  }

  function onKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      addBattleSubmit();
    }
  }
</script>

<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label
    for="test_name"
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    Testen
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    {#each battles as battle, i}
      <div class="mt-1 mb-1">
        {battle.name}
        <button
          data-test="battle-{i}-button"
          class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click|preventDefault={() => removeBattle(i)}>Weghalen</button
        >
      </div>
    {/each}
    <div>
      <input
        on:keypress={onKeyPress}
        type="text"
        bind:value={newBattleName}
        name="test_name"
        id="test_name"
        class="mt-2 mb-2 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
      />
      <button
      data-test="add-battle-button"
        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        on:click|preventDefault={addBattleSubmit}>Test toevoegen</button
      >
    </div>
  </div>
</div>
