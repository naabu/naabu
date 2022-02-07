<script>
  import { getStores, session, page } from "$app/stores";
  import PathsForm from "$lib/Module/Components/pathsForm.svelte";
  import { onMount } from "svelte";
  import {
    getAlgoliaSearchClient,
    getGoalIndex,
  } from "$lib/Internals/Algolia/algolia";
  import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
  import "@algolia/autocomplete-theme-classic";
  import VerwijderDialog from "$lib/Internals/Misc/dialog.svelte";
  import { generatePathsForMap } from "$lib/Module/Map/Components/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Checkbox from "$lib/Internals/FormFields/Checkbox.svelte";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import MultipleCheckbox from "$lib/Internals/FormFields/MultipleCheckbox.svelte";

  let filters = "";
  let goalIndex = getGoalIndex($session.environment);

  export let map;

  $: if (map) {
    generatePathsForMap(map);
  }

  export let selectedIndex = 0;
  let deleteLocationToggle = false;
  let locationOptions;
  let selectedLocationTab = "content";
  let autoCompleteElementExists = null;
  let autoCompleteTimer;

  $: console.log(map.locations);

  $: {
    for (let i = 0; i < map.locations.length; i++) {
      let newAccessLocations = [];
      for (let i2 = 0; i2 < map.locations[i].accessLocations.length; i2++) {
        let idFound = false;
        for (let i3 = 0; i3 < map.locations.length; i3++) {
          if (map.locations[i3].id === map.locations[i].accessLocations[i2]) {
            idFound = true;
          }
        }
        if (idFound) {
          newAccessLocations.push(map.locations[i].accessLocations[i2]);
        }
      }
      map.locations[i].accessLocations = newAccessLocations;
    }
  }

  $: {
    locationOptions = [];
    for (let i = 0; i < map.locations.length; i++) {
      if (i !== selectedIndex) {
        locationOptions.push({
          value: map.locations[i].id,
          label: "L" + (i + 1),
          dataTest: "access-location-" + (i + 1),
        });
      }
    }
  }

  $: {
    if (selectedIndex >= 0 && map.locations.length > 0) {
      resetFilters();
    }
  }

  $: {
    if (map.locations.length === 0) {
      addLocation();
    }
  }

  function deleteLocation() {
    map.locations.splice(selectedIndex, 1);
    map.locations = map.locations;
    selectedIndex = 0;
  }

  function setselectedIndex(index) {
    selectedIndex = index;
  }

  function removeLocationButtonFunction() {
    deleteLocationToggle = true;
  }

  function addLocation() {
    let randomString = "";
    let uniqueString = false;
    while (!uniqueString) {
      randomString = Math.random().toString(36).substring(2, 7);
      uniqueString = true;
      for (let i = 0; i < map.locations.length; i++) {
        if (map.locations[i].id === randomString) {
          uniqueString = false;
        }
      }
      if (randomString.length < 5) {
        uniqueString = false;
      }
    }

    let location = {
      id: randomString,
      isStartLocation: false,
      accessLocations: [],
      name: "",
      textPositionX: "",
      textPositionY: "",
      markerPositionX: "",
      markerPositionY: "",
      goals: [],
    };
    map.locations = [...map.locations, location];
    resetFilters();
  }

  function resetFilters() {
    let objectIDsFilter = map.locations[selectedIndex].goals.map(
      (leerdoel) =>
        "NOT objectID:" + (leerdoel.objectID ? leerdoel.objectID : leerdoel.id)
    );
    filters = objectIDsFilter.join(" AND ");
  }

  function addGoal(goal) {
    map.locations[selectedIndex].goals = [
      ...map.locations[selectedIndex].goals,
      goal,
    ];
    resetFilters();
  }

  function removeGoal(event) {
    map.locations[selectedIndex].goals.splice(event.detail.i, 1);
    map.locations[selectedIndex].goals = map.locations[selectedIndex].goals;
    resetFilters();
  }

  onMount(() => {
    // runAutocomplete();
  });

  $: if (selectedLocationTab === "content") {
    autoCompleteTimer = setInterval(() => {
      autoCompleteElementExists = document.getElementById(
        "autocomplete-leerdoelen"
      );
    }, 100);
  }

  $: if (autoCompleteElementExists !== null && autoCompleteTimer) {
    clearInterval(autoCompleteTimer);
    runAutocomplete();
  }

  function runAutocomplete() {
    if (map.locations.length > 0) {
      const searchClient = getAlgoliaSearchClient();
      autocomplete({
        container: "#autocomplete-leerdoelen",
        placeholder: "Zoek voor leerdoelen",
        onSubmit({ state }) {
          console.log(state);
        },
        getSources({ query }) {
          return [
            {
              sourceId: goalIndex,
              onSelect({ state, item }) {
                addGoal(item);
              },
              getItems() {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: goalIndex,
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                      filters: filters,
                    },
                  ],
                });
              },
              templates: {
                item({ item }) {
                  return item.title;
                },
                noResults() {
                  return "Geen leerdoelen gevonden";
                },
              },
            },
          ];
        },
      });
    }
  }

  function setAutocompleteNull() {
    autoCompleteElementExists = null;
  }

  function setSelectedLocationTab(tab) {
    selectedLocationTab = tab;
    autoCompleteElementExists = null;
  }

  let locationTabs = [];

  $: if (map.locations) {
    locationTabs = [];
    for (let i = 0; i < map.locations.length; i++) {
      locationTabs.push({
        value: i,
        text: "L" + (i + 1),
        dataTest: "location-tab-l" + (i + 1),
      });
    }
  }

  let locationCategories = [
    {
      value: "content",
      text: "Inhoud",
      dataTest: "inhoud-button",
    },
    {
      value: "waypoints",
      text: "Waypoints",
      dataTest: "waypoints-button",
    },
    {
      value: "paths",
      text: "Paden",
      dataTest: "paths-button",
    },
  ];

  $: console.log(map.locations[selectedIndex].accessLocations);

  let testGroup = [""];

  $: console.log(testGroup);
</script>

<VerwijderDialog bind:toggle={deleteLocationToggle} on:ok={deleteLocation} />

<div>
  <Tabs mainTabs={locationTabs} bind:mainSelected={selectedIndex}>
    <svelte:fragment slot="after-main-tabs">
      <Button
        dataTest="new-location-button"
        on:click={addLocation}
        content="New Location"
        size="small"
      />
    </svelte:fragment>
  </Tabs>
  <Tabs
    mainTabs={locationCategories}
    bind:mainSelected={selectedLocationTab}
    on:click={setAutocompleteNull}
  />

  <div class="space-y-3 sm:space-y-2">
    <div>
      <div>
        {#if selectedLocationTab === "content"}
          <FieldSet>
            <FormField title="Name" id="location_name">
              <Textarea
                id="location_name"
                bind:value={map.locations[selectedIndex].name}
              />
            </FormField>

            <FormField id="learning-goals" title="Gekoppelde leerdoelen">
              <div id="learning-goals">
                <TextAndRemove
                  items={map.locations[selectedIndex].goals}
                  on:remove={removeGoal}
                  dataTest="remove-goal-button-"
                  noItemsMessage="Nog geen leerdoelen aan activiteit toegevoegd"
                >
                  <svelte:fragment let:item={goal} slot="show">
                    {goal.title}
                  </svelte:fragment>
                </TextAndRemove>
              </div>
            </FormField>

            <FormField title="Leerdoel toevoegen" id="autocomplete-leerdoelen">
              <div id="autocomplete-leerdoelen" class="max-w-lg" />
            </FormField>
          </FieldSet>
        {:else if selectedLocationTab === "waypoints"}
          <FieldSet>
            <FormField title="Tekst position X" id="text_position_x">
              <NumberInput
                id="text_position_x"
                min="0"
                max="2000"
                bind:value={map.locations[selectedIndex].textPositionX}
              />
            </FormField>
            <FormField title="Tekst position Y" id="text_position_y">
              <NumberInput
                id="text_position_y"
                min="0"
                max="2000"
                bind:value={map.locations[selectedIndex].textPositionY}
              />
            </FormField>
            <FormField title="Marker position X" id="marker_position_x">
              <NumberInput
                id="marker_position_x"
                min="0"
                max="2000"
                bind:value={map.locations[selectedIndex].markerPositionX}
              />
            </FormField>
            <FormField title="Marker position Y" id="marker_position_y">
              <NumberInput
                id="marker_position_y"
                min="0"
                max="2000"
                bind:value={map.locations[selectedIndex].markerPositionY}
              />
            </FormField>
            <FormField labelPosition="left" title="Toegang">
              <Checkbox
                label="Start locatie op kaart"
                id="start_locations_check"
                bind:checked={map.locations[selectedIndex].isStartLocation}
              />

              <MultipleCheckbox
                name="accesslocations"
                bind:group={map.locations[selectedIndex].accessLocations}
                bind:options={locationOptions}
              />
            </FormField>
          </FieldSet>
        {:else if selectedLocationTab === "paths"}
          <PathsForm bind:map bind:selectedIndex />
        {/if}
      </div>
      <div class="flex justify-end mt-3">
        <Button
          dataTest="remove-location-button"
          on:click={() => removeLocationButtonFunction()}
          content="Locatie verwijderen"
          size="small"
        />
      </div>
    </div>
  </div>
</div>
