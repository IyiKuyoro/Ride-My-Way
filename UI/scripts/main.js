var signIn = document.getElementById('sign-in-btn');
var signUp = document.getElementById('sign-up-btn');
var message = document.getElementById('message');

signIn.addEventListener('click', function(event){
    const email = document.getElementById('emailField');
    const password = document.getElementById('passwordField');

    if( email.value !== '' && password.value !== ''){
        //dummy log in
        event.preventDefault();
        window.location.replace('dashboard.html');
    }
});

// sign-up page
signUp.addEventListener('click', function(event){    
    event.preventDefault();
    window.location.replace('../dashboard.html');
});
