const myform = document.getElementById("demo");

let token;
    const birthDate = document.getElementById("birthdate") ;
    const email = document.getElementById("email") ;
    const fullName = document.getElementById("fullname");
    const password = document.getElementById("password");
    const phoneNumber = document.getElementsByClassName("phoneNumber")
    const address = document.getElementById("address");
    
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
      
      
myform.addEventListener('submit', function (e){
    e.preventDefault();
    let gender = document.getElementsByName('gender');
    for (var radio of gender){
      if (radio.checked) {    
                gender = radio;
                  alert(radio.value);
                          }
                        }
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
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(birthDate.value) || /^\d{4}-\d{2}-\d{2}$/.test(birthDate.value)) {
      console.log(birthDate.value); 
    } else {
      alert('invalid date');
      return false;
    }
    if (!fullName.value) { 
      alert('Full Name is required');
      return;
    }
    if (!address.value) { 
      alert('address is required');
      return;
    }
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) { 
      console.log(email);  
    }
    else{
      alert('email is invalid');
      return;
    }

    if (password.value.length < 6 || !/\d/.test(password.value)) {
      alert('Password must be at least 6 characters and include at least one digit');
      return;
    }
    if (!gender.value) {
      console.log(gender)
      alert('gender is required');
      return;
    }
    if (!email.value) {
      alert('email is required');
      return;
    }
    
    fetch("https://food-delivery.kreosoft.ru/api/account/register",{
method : 'post',
headers : {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body :JSON.stringify({
Email: email.value,
FullName: fullName.value,
Password: password.value,
Address : address.value,
birthdate : birthDate.value,
Gender : gender.value ,
phonenumber : formattedPhoneNumber
})
}).then(function(response) {
  let s = response.status;
  console.log(gender);
  console.log(fullName.value)
  console.log(response);
  if(s == 200){
    alert('account registered succefully ') ;
    console.log(gender)
    }
    else{
      alert('failed to register');
    }
return response.text();
})
});