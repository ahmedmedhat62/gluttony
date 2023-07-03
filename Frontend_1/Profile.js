console.log(localStorage.getItem('token'));
let name = document.getElementById("fullname");
fetch("https://food-delivery.kreosoft.ru/api/account/profile",{
    method : 'GET',
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "content-type": "application/x-www-form-urlencoded",
        Authorization : 'Bearer ' + localStorage.getItem('token')
    },
})
.then(function(response) {
    let s = response.status;

    if (1 === 1) console.log('hey')
   
    if (s == 200) {
        $(document).ready(function () {
            $(".phoneNumber").inputmask("+7 (999) 999-99-99-99", {
                placeholder: ' '
            }).on('input', function () {
                var value = this.value.replace(/_/g, '');
                if (value.length < 18) {
                    this.setCustomValidity('Please enter a valid phone number in the format +7 (XXX) XXX-XX-XX-XX');
                } else {
                    this.setCustomValidity('');
                }
            });
        });
        
        // Parse the response body as JSON
        return response.json();
    } else {
        alert('you need to Log in !!');
        window.location.replace("http://127.0.0.1:5500/Login.html");
        throw new Error('Failed to register');

    }
})
.then(function(data) { // add this block to log or display the response body
    console.log(data.gender);
    let name = document.getElementById("fullname");
    let email = document.getElementById("email");
    let date = document.getElementById("birthdate");
    let gender = document.getElementById("gender");
    let phone = document.getElementById("phoneNumber");
    let address = document.getElementById("address");
    name.value = data.fullName;
    email.textContent = data.email;
    date.value = data.birthDate;
    gender.textContent = data.gender;
    phone.value = data.phoneNumber;
    address.value = data.address;
    let myform = document.getElementById("myform");
    myform.addEventListener('submit',function(e){
    e.preventDefault();
     var phoneNumberInput = document.getElementsByName('phoneNumber')[0];
    if (!phoneNumberInput.checkValidity()) {
        // handle invalid input
        return;
    }
    var phoneNumberValue = $(phoneNumberInput).inputmask("unmaskedvalue");
    var formattedPhoneNumber = "+7 (" + phoneNumberValue.substring(0, 3) + ") " + phoneNumberValue.substring(3, 6) + "-" + phoneNumberValue.substring(6, 8) + "-" + phoneNumberValue.substring(8, 10) + "-" + phoneNumberValue.substring(10, 12);
    console.log(phoneNumberValue);
    if (!phoneNumberValue) {
      alert('Phone number is required');
      return;
  }
  if (phoneNumberValue.length < 10) {
      alert('Phone number must be at least 10 digits');
      return;
  }
  if (!phoneNumberInput.checkValidity()) {
      // handle invalid input
      return;
  }
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/.test(date.value)) {
    console.log(date.value); 
  } else {
    alert('invalid date');
    return false;
  }
    if (!name.value) { 
      alert('Full Name is required');
      return;
    }
    if (!address.value) { 
      alert('address is required');
      return;
    }
    console.log("button clicked");
    
    fetch("https://food-delivery.kreosoft.ru/api/account/profile", {
  method: "PUT",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  },
  body : JSON.stringify({
    fullName: name.value,
    birthDate: date.value,
    gender: gender.value,
    address: address.value,
    phoneNumber: formattedPhoneNumber
})
})
.then(function(response) {
  console.log(response.headers.get("Allow"));
})
.catch(function(error) {
  console.error(error);
});
})

    
    // You can display the response body on the page by modifying the HTML
    // of an element with a specific ID, for example:
    // document.getElementById('response-body').innerHTML = JSON.stringify(data);
})
.catch(function(error) {
    console.error(error);
});

