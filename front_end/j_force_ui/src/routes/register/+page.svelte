<script>
  import { handleRegistrationServices } from "../../services/api_services";
  import { loginStore } from "../../services/user_store";
  import { goto } from '$app/navigation';
  let userName = "";
  let password = "";
  let email = "";
  let mobileNo = "";
  let errorMessage = "";

  const handleRegistration = async () => {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errorMessage = "Please enter a valid email address.";
      return;
    } else {
      errorMessage = "";
    }
    const mobileNumberRegex = /^\d{10}$/;
  if (!mobileNo || !mobileNumberRegex.test(mobileNo)) {
    errorMessage = "Please enter a valid 10-digit mobile number.";
    return;
  } else {
    errorMessage = "";
  }
    const result = await handleRegistrationServices({
      mobileNo: mobileNo,
      password: password,
      email: email,
      userName: userName,
    });
    console.log(result);
    if (result.status === "success") {
        loginStore.set(result.data);
        const data = "/";
        goto(data);
      
    }
  };
</script>

<main>
  <h2>Registration</h2>
  <form on:submit|preventDefault={handleRegistration}>
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
    <label>
      Email:
      <input type="email"   placeholder="please enter your email" bind:value={email} />
    </label>
    <label>
      Mobile No:
      <input
      type="text"
      placeholder="please enter 10 digit mobile no "
      bind:value={mobileNo}
    />
    </label>
    {#if errorMessage}
      <p style="color: red; width:60%">{errorMessage}</p>
    {/if}
    <div style="display: flex; gap: 1rem;">
      <button type="submit">Register</button><a href="/" class="login_btn"
        >Login</a
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

    /* Adjust the width of the buttons to make them appear side by side */
    button,
    .login_btn {
      width: calc(50% - 0.5rem);
    }

    /* Increase the gap between the buttons */
    .login_btn {
      margin-left: 1rem;
    }
  }
</style>
