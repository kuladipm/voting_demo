<script>
	import { loginStore } from "../../../services/user_store";
 import { giveVoteServices } from "../../../services/api_services";
	let data = $loginStore;
	console.log(data.vote)
	let vote=data.vote
	let isVoted =vote;
	console.log(isVoted)
	$:isVotingDone=""
const handleVote =async (e) =>{
	e.pre
	  console.log("Voted for:", vote);
	  console.log(data)
	  const result=await giveVoteServices({user_id:data.user_id,vote:vote});
	  if (result.status==="success") {
		isVotingDone=true
	  } else {
		alert('You already voted')
	  }
	}
  </script>
  
  <main>
	<h1>Welcome to Voting System</h1>
	{#if !isVoted}
	  <form>
		<label>
		  <input
			type="radio"
			name="candidate"
			value="CANDIDATE 1"
			bind:group={vote}
		  />
		  CANDIDATE 1
		</label>
		<br />
  
		<label>
		  <input
			type="radio"
			name="candidate"
			value="CANDIDATE 2"
			bind:group={vote}
		  />
		  CANDIDATE 2
		</label>
		<br />
  
		<label>
		  <input
			type="radio"
			name="candidate"
			value="CANDIDATE 3"
			bind:group={vote}
		  />
		  CANDIDATE 3
		</label>
		<br />
  
		<label>
		  <input
			type="radio"
			name="candidate"
			value="CANDIDATE 4"
			bind:group={vote}
		  />
		  CANDIDATE 4
		</label>
		<br />
  
		<button on:click={handleVote}>Vote</button>
	  </form>
	{:else}
	  <p>You have voted for: {vote}</p>
	{/if}
	{#if isVotingDone}
	<p>You have voted for: {vote}</p>
	{/if}
  </main>
  
  <style>
	main {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  height: 100vh;
	  background-color: #f0f0f0;
	  font-family: Arial, sans-serif;
	}
  
	h1 {
	  font-size: 2rem;
	  margin-bottom: 1rem;
	}
  
	form {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  gap: 0.5rem;
	  background-color: #fff;
	  border: 1px solid #ccc;
	  padding: 1rem;
	  border-radius: 4px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
  
	label {
	  display: flex;
	  align-items: center;
	  gap: 0.5rem;
	  cursor: pointer;
	}
  
	input[type="radio"] {
	  margin-right: 8px;
	}
  
	button {
	  padding: 0.5rem 1rem;
	  font-size: 16px;
	  border: none;
	  border-radius: 4px;
	  background-color: #007bff;
	  color: #fff;
	  cursor: pointer;
	  transition: background-color 0.2s ease-in-out;
	}
  
	button:hover {
	  background-color: #0056b3;
	}
  
	p {
	  font-size: 18px;
	  font-weight: bold;
	  color: #007bff;
	}
  </style>

  