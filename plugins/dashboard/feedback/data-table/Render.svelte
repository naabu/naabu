<script>
  export let modelData;
</script>

<table>
  {#each modelData.rows as row}
    <tr>
      {#each row as column}
        <td>
          {column}
        </td>
      {/each}
    </tr>
  {/each}
</table>
