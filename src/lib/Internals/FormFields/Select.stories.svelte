<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Select from "$lib/Internals/FormFields/Select.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";


  function compareCustomInputValue(value1, value2) {
    if(value1.nameid === value2.nameid) {
      return true;
    }
    return false;
  }
</script>

<Meta title="Select/Stories" component={Select} />

<Template let:args>
  <SimpleDivDecorator>
    <Select {...args} />
  </SimpleDivDecorator>
</Template>

<Story
  id="single"
  name="Single select"
  args={{
    options: [
      {
        value: "volvo",
        content: "Volvo",
      },
      {
        value: "saab",
        content: "Saab",
      },
      {
        value: "mercedes",
        content: "Mercedes",
      },
      {
        value: "audi",
        content: "Audi",
      },
    ],
  }}
/>

<Story
  id="multiple"
  name="Multiple select"
  args={{
    multiple: true,
    value: ["saab", "tesla"],
    options: [
      {
        value: "volvo",
        content: "Volvo",
      },
      {
        value: "saab",
        content: "Saab",
      },
      {
        value: "mercedes",
        content: "Mercedes",
      },
      {
        value: "audi",
        content: "Audi",
      },
      {
        value: "tesla",
        content: "Tesla",
      },
      {
        value: "toyota",
        content: "Toyota",
      },
    ],
  }}
/>


<Story
  id="multiple_compare"
  name="Multiple checkbox compare with function"
  args={{
    compareFunction: compareCustomInputValue,
    value: [],
    multiple: true,
    options: [
      {
        value: { nameid: "volvo", revenue: "100000" },
        content: "Volvo",
      },
      {
        value: { nameid: "saab", revenue: "40000" },
        content: "Saab",
      },
      {
        value: { nameid: "mercedes", revenue: "50000" },
        content: "Mercedes",
      },
      {
        value: { nameid: "audi", revenue: "4000" },
        content: "Audi",
      },
      {
        value: { nameid: "tesla", revenue: "10" },
        content: "Tesla",
      },
      {
        value: { nameid: "toyota", revenue: "400123230" },
        content: "Toyota",
      },
    ],
  }}
/>
