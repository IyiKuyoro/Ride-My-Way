const signUp = document.getElementById('sign-up-btn');

signUp.addEventListener('submit', (event) => {
  event.preventDefault();

  fetch('http://localhost:3000/api/v1/auth/signup', {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      fristname: 'sjkdsj'
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
});
