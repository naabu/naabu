<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";

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

  function removeBattle(event) {
    battles.splice(event.detail.i, 1);
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

<FormField forId="test_name" labelPosition="left" title="Testen">
  <TextAndRemove items={battles} on:remove={removeBattle}>
    <svelte:fragment let:item={battle} slot="show">
      {battle.name}
    </svelte:fragment>
  </TextAndRemove>
  <FormField labelPosition="none">
    <TextInput
      on:keypress={onKeyPress}
      bind:value={newBattleName}
      id="test_name"
    />
  </FormField>
  <Button
    on:click={addBattleSubmit}
    size="small"
    dataTest="add-battle-button"
    content="Test toevoegen"
  />
</FormField>
