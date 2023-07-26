const base_url="http://localhost:5000/api"
export const handleLoginServices=async(loginData)=>{
    try {
        const res = await fetch(`${base_url}/user-login`, {
            method: "Post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(loginData),
          });
          const result = await res.json();
          localStorage.setItem('jwt', result.token);
          return await result;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return await error;
    }
  }

 
export const giveVoteServices=async(votingDetails)=>{
    try {
        const token = localStorage.getItem('jwt');
        const res = await fetch(`${base_url}/user-vote`, {
            method: "PATCH",
            headers: {
                'auth': `${token}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(votingDetails),
          });
          const result = await res.json();
          return await result;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return await error;
    }
  }
  export const handleRegistrationServices=async(registrationData)=>{
    try {
        console.log(registrationData)
        const res = await fetch(`${base_url}/user`, {
            method: "Post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(registrationData),
          });
          const result = await res.json();
          return await result;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return await error;
    }
  }
  
  

