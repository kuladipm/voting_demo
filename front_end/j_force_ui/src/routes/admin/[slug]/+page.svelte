<script>
	export let data;
	let userData = JSON.parse(data.data);
  </script>
  
  <main>
	<div class="table-container">
	  <h1>Candidates And Their Total Vote</h1>
	  <table>
		<thead>
		  <tr>
			<th>ID</th>
			<th>VOTE COUNT</th>
		  </tr>
		</thead>
		<tbody>
		  {#each Object.entries(userData) as [candidate, votes]}
			<tr>
			  <td>{candidate}</td>
			  <td>{votes}</td>
			</tr>
		  {/each}
		</tbody>
	  </table>
	</div>
  </main>
  
<style>
	.table-container {
  max-width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

thead {
  background-color: #f0f0f0;
}

/* Responsive styles */
@media (max-width: 768px) {
  th,
  td {
    font-size: 14px;
  }
}

</style>
