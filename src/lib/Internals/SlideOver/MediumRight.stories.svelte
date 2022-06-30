<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import MediumRight from "$lib/Internals/SlideOver/MediumRight.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
  import Button from "../Button/Button.svelte";

  let toggle;
</script>

<Meta title="SlideOver/Stories" />

<Template id="mediumRight" let:args>
  <SimpleDivDecorator>
    <Button content="toggle" on:click={() => (toggle = !toggle)} />
    {#if args.content}
      <MediumRight {...args} bind:toggle>
        {args.content}
      </MediumRight>
    {:else}
      <MediumRight {...args} bind:toggle />
    {/if}
  </SimpleDivDecorator>
</Template>

<Story
  template="mediumRight"
  id="mediumRightEmpty"
  name="Medium Right Slide over empty"
  args={{
    slideOverTitle: "Storybook slide over title",
    slideOverText: "Text explaining the slide over",
    toggle: true,
  }}
/>

<Story
  template="mediumRight"
  id="mediumRightContent"
  name="Medium Right Slide over with content"
  args={{
    slideOverTitle: "Storybook slide over title",
    slideOverText: "Text explaining the slide over",
    toggle: true,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac libero aliquet, venenatis mi et, consectetur magna. Praesent semper nisl a rhoncus laoreet. Aliquam sit amet leo turpis. Proin sit amet dictum massa. Nunc finibus varius varius. Quisque dapibus sit amet nibh a semper. Duis tempus sodales euismod.Maecenas ultricies eget mauris quis fermentum. Curabitur eu luctus sem. Morbi auctor, metus in tempor pellentesque, mi metus maximus ante, sodales tristique eros orci id quam. Donec vitae felis porttitor, vestibulum urna in, volutpat dolor. Sed at ex vel ex ultrices tincidunt. Nullam ullamcorper quis turpis ut ornare. Etiam in turpis ultricies, condimentum purus et, porta velit. Aliquam pretium libero porttitor consectetur laoreet. Suspendisse risus dolor, mattis non tellus ac, bibendum aliquam nisl. Nullam rutrum gravida lacus, in scelerisque elit eleifend non. Phasellus malesuada sollicitudin ligula sit amet viverra. Aliquam vestibulum sodales congue. Nulla tincidunt malesuada ante in volutpat. Proin consectetur pellentesque enim ac finibus. Suspendisse id erat in purus ultricies iaculis sodales vel ligula. Curabitur suscipit est eget viverra tincidunt. Mauris condimentum mauris sit amet est ullamcorper, in feugiat orci elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi a rhoncus metus. Curabitur pharetra pulvinar enim vitae molestie. Quisque dapibus sit amet nibh a semper. Duis tempus sodales euismod.Maecenas ultricies eget mauris quis fermentum. Curabitur eu luctus sem. Morbi auctor, metus in tempor pellentesque, mi metus maximus ante, sodales tristique eros orci id quam. Donec vitae felis porttitor, vestibulum urna in, volutpat dolor. Sed at ex vel ex ultrices tincidunt. Nullam ullamcorper quis turpis ut ornare. Etiam in turpis ultricies, condimentum purus et, porta velit. Aliquam pretium libero porttitor consectetur laoreet. Suspendisse risus dolor, mattis non tellus ac, bibendum aliquam nisl. Nullam rutrum gravida lacus, in scelerisque elit eleifend non. Phasellus malesuada sollicitudin ligula sit amet viverra. Aliquam vestibulum sodales congue. Nulla tincidunt malesuada ante in volutpat. Proin consectetur pellentesque enim ac finibus. Suspendisse id erat in purus ultricies iaculis sodales vel ligula. Curabitur suscipit est eget viverra tincidunt. Mauris condimentum mauris sit amet est ullamcorper, in feugiat orci elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi a rhoncus metus. Curabitur pharetra pulvinar enim vitae molestie. Quisque dapibus sit amet nibh a semper. Duis tempus sodales euismod.Maecenas ultricies eget mauris quis fermentum. Curabitur eu luctus sem. Morbi auctor, metus in tempor pellentesque, mi metus maximus ante, sodales tristique eros orci id quam. Donec vitae felis porttitor, vestibulum urna in, volutpat dolor. Sed at ex vel ex ultrices tincidunt. Nullam ullamcorper quis turpis ut ornare. Etiam in turpis ultricies, condimentum purus et, porta velit. Aliquam pretium libero porttitor consectetur laoreet. Suspendisse risus dolor, mattis non tellus ac, bibendum aliquam nisl. Nullam rutrum gravida lacus, in scelerisque elit eleifend non. Phasellus malesuada sollicitudin ligula sit amet viverra. Aliquam vestibulum sodales congue. Nulla tincidunt malesuada ante in volutpat. Proin consectetur pellentesque enim ac finibus. Suspendisse id erat in purus ultricies iaculis sodales vel ligula. Curabitur suscipit est eget viverra tincidunt. Mauris condimentum mauris sit amet est ullamcorper, in feugiat orci elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi a rhoncus metus. Curabitur pharetra pulvinar enim vitae molestie.",
  }}
/>
