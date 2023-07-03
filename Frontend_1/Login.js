let email = document.getElementById("emaill");

let password = document.getElementById("passwordl");
let myform = document.getElementById("sign_in");

myform.addEventListener('submit', function (e){
    e.preventDefault();
    console.log("a")
    console.log(email.value)
    fetch("https://food-delivery.kreosoft.ru/api/account/login",{
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(function(response) {
        let s = response.status;
        console.log(email.value)
        console.log(password.value)
        console.log(response);
        if (s == 200) {
            alert('account registered successfully') ;
            console.log(response);
            // Parse the response body as JSON
            return response.json();
        } else {
            alert('failed to register');
            throw new Error('Failed to register');
        }
    })
    .then(function(data) {
        // Extract the token from the JSON object
        localStorage.setItem('token',data.token);
        console.log(localStorage.token);
    })
    .catch(function(error) {
        console.log(error);
    });
})