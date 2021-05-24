<script>
    import { onMount } from 'svelte';
    import algoliasearch from 'algoliasearch/lite';
    
    let searchClient;
    let index;
    
    let query = '';
    let hits = [];
    
    onMount(() => {
    
        searchClient = algoliasearch(
        '6868GHOPYM',
        '91b10504939fb851e4fab041ddd92618'
        );
        index = searchClient.initIndex('customers');
    
        // Warm up search
        index.search({ query }).then(console.log)
    
    });
    
    // Fires on each keyup in form
    async function search() {
        const result = await index.search({ query });
        hits = result.hits;
        console.log(hits)
    }
    
    
    </script>
    
    <style>
        :global(em) {
            color: red;
            font-weight: bold;
            background: black;
        }
    </style>
    
    
    <h1>Svelte InstantSearch</h1>
    
    <div>
        <input type="text" bind:value={query} on:keyup={search}>
    </div>
    
    
    {#each hits as hit}
        <img src={hit.avatar} alt={hit.username}>
        <section>
            <h3>{hit.username} {hit.objectID}</h3>
            <!-- <p>{hit.bio}</p> -->
    
            <p contenteditable bind:innerHTML={hit._highlightResult.bio.value}></p>
        </section>
    {/each}