<script>
  import ManagementTabs from "$lib/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  
  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    }
  ];

</script>

<ShowBreadcrumb bind:breadcrumbs/>
<ManagementTabs />

 <br/>

TODO: Maybe some dashboards here. Related to activity?