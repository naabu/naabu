<script>
  import Button from "$lib/Internals/Button/Button.svelte";

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
        <Button
          dataTest="battle-{i}-button"
          size="very-small"
          on:click={() => removeBattle(i)}
          content="Weghalen"
        />
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
      <Button
        on:click={addBattleSubmit}
        size="small"
        dataTest="add-battle-button"
        content="Test toevoegen"
      />
    </div>
  </div>
</div>
