<script>
  import { handleLoginServices } from "../services/api_services";
  import {loginStore} from "../services/user_store"
  import { goto } from '$app/navigation';
  let userName = "";
  let password = "";
  let errorMessage = "";

  const handleLogin = async () => {
    if (!userName || userName.trim() === "") {
      errorMessage = "Username cannot be blank.";
      return;
    } else {
      errorMessage = "";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      errorMessage =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      return;
    }
    const result = await handleLoginServices({
      userName: userName,
      password: password,
    });
    console.log(result);
    if (result.status==="success") {
        console.log(result.data)
        if (result.role==="Admin") {
            const data = '/admin/' + encodeURIComponent(JSON.stringify(result.data));
		goto(data);
        } else {
            loginStore.set(result.data)
            const data = '/user/' + encodeURIComponent(JSON.stringify(result.data));
		goto(data); 
        }
        
    } else {
        alert('something went wrong')
    }
  };
</script>

<main>
  <h2>Login</h2>
  <form on:submit|preventDefault={handleLogin}>
    <label>
      User Name:
      <input
        type="text"
        placeholder="please enter user name"
        bind:value={userName}
      />
    </label>
    <label>
      Password:
      <input
        type="password"
        placeholder="please enter 8 character password"
        bind:value={password}
      />
    </label>
    {#if errorMessage}
      <p style="color: red; width:60%">{errorMessage}</p>
    {/if}
    <div style="display: flex; gap: 1rem;">
      <button type="submit">Login</button><a href="/register" class="login_btn"
        >Register</a
      >
    </div>
  </form>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button,
  .login_btn {
    padding: 0.5rem 1rem;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  .error-message {
    color: red;
    margin-top: 0.5rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }

    input {
      width: 100%;
    }
    button,
    .login_btn {
      width: calc(50% - 0.5rem);
    }
    .login_btn {
      margin-left: 1rem;
    }
  }
</style>
