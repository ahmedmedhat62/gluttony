flatpickr("#date", {
    enableTime: true,
    minDate: "today",
    minTime: new Date(Date.now() + 60 * 60 * 1000), // Minimum time is 1 hour from now
    dateFormat: "Y-m-d\\TH:i:S",
    onReady: function(selectedDates, dateStr, instance) {
      // Disable all times before the minimum time
      var minTime = instance.config.minTime;
      var times = instance._input.parentNode.querySelectorAll(".flatpickr-time > option");
      for (var i = 0; i < times.length; i++) {
        var time = times[i].value.split(":");
        var hour = parseInt(time[0]);
        var minute = parseInt(time[1]);
        var timeDate = new Date();
        timeDate.setHours(hour);
        timeDate.setMinutes(minute);
        if (timeDate < minTime) {
          times[i].disabled = true;
        }
      }
    }
  });

fetch("https://food-delivery.kreosoft.ru/api/account/profile",{
    method : 'GET',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization : 'Bearer ' + localStorage.getItem('token')
    },
  })
  .then(function(response) {
    let s = response.status;
    console.log(response);
    response.json().then(function(data) {
        console.log(data);
        let email = document.getElementById("email");
        email.textContent = data.email ;
        let phonenum = document.getElementById("phonenumber");
        phonenum.textContent = data.phoneNumber;
    })
  })
  .catch(function(error) {
    console.log(error);
  });

fetch("https://food-delivery.kreosoft.ru/api/basket", {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "content-type": "application/x-www-form-urlencoded",
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})
.then(function(response) {
  let s = response.status;
  console.log(response);
  if (s == 200) {
    response.json().then(function(data) {
      console.log(data);
      
      let container = document.getElementById("container");
      let heading = document.createElement("h1");
      heading.classList.add('text-center','fw-normal', 'mb-0', 'text-black');
      heading.innerText = "Your Cart";
      container.appendChild(heading);

      for(let i = 0; i<data.length;i++){
        let card = document.createElement("div");
        card.classList.add('card', 'rounded-3', 'mb-4');
        let cardBody = document.createElement("div");
        cardBody.classList.add('card-body', 'p-4');
        card.appendChild(cardBody);

        // Create a label to display the dish number
        let label = document.createElement("div");
        label.classList.add('label');
        label.innerText = i + 1 ;
        label.style.position = 'absolute';
        label.style.top = '0';
        label.style.left = '0';
        label.style.transform = 'translate(-50%, -50%)';
        label.style.backgroundColor = '#fff';
        label.style.borderRadius = '50%';
        label.style.padding = '5px 8px';
        card.appendChild(label);

        let row = document.createElement("div");
        row.classList.add('row', 'd-flex', 'justify-content-between', 'align-items-center');
        cardBody.appendChild(row);

        let imgDiv = document.createElement("div");
        imgDiv.classList.add('col-md-2', 'col-lg-2', 'col-xl-2');
        row.appendChild(imgDiv);

        let img = document.createElement("img");
        img.classList.add('img-fluid', 'rounded-3');
        img.src = `${data[i].image}`;
        imgDiv.appendChild(img);

        let textDiv = document.createElement("div");
        textDiv.classList.add('col-md-3', 'col-lg-3', 'col-xl-3');
        row.appendChild(textDiv);

        let title = document.createElement("p");
        title.classList.add('lead', 'fw-normal', 'mb-2');
        title.innerText =  `${data[i].name}`;
        textDiv.appendChild(title);

        // Create a paragraph element to display the quantity of the dish
        let quantityPara = document.createElement("p");
        quantityPara.classList.add('mb-0', 'fw-light');
        quantityPara.innerText = `Quantity: ${data[i].amount}`;
        textDiv.appendChild(quantityPara);

        let priceDiv = document.createElement("div");
        priceDiv.classList.add('col-md-3', 'col-lg-2', 'col-xl-2');
        row.appendChild(priceDiv);

        // Create a paragraph element to display the price per unit of the dish
        let pricePara = document.createElement("p");
        pricePara.classList.add('mb-2', 'fw-light');
        pricePara.innerText = `Price per unit: ${data[i].price}`;
        priceDiv.appendChild(pricePara);

        // Create a paragraph element to display the total price of the dish
        let totalPricePara = document.createElement("p");
        totalPricePara.classList.add('mb-0', 'fw-light');
        totalPricePara.innerText = `Total price: ${data[i].totalPrice}`;
        priceDiv.appendChild(totalPricePara);

        let quantityDiv = document.createElement("div");
        quantityDiv.classList.add('col-md-3', 'col-lg-3', 'col-xl-2', 'd-flex');
        row.appendChild(quantityDiv);

        container.appendChild(card);
      }

      // Add a div to display the total price and a button to confirm the order
      let totalDiv = document.createElement("div");
      totalDiv.classList.add('text-center', 'mt-4');

      let totalPara = document.createElement("p");
      totalPara.classList.add('lead', 'fw-normal');
      let totalPrice = data.reduce((total, item) => total + item.totalPrice, 0);
      totalPara.innerText = `Total: ${totalPrice}`;
     
      totalDiv.appendChild(totalPara);

      let confirmButton = document.createElement("button");
      confirmButton.classList.add('btn', 'btn-primary');
      confirmButton.innerText = "Confirm Order";
      totalDiv.appendChild(confirmButton);
     
      confirmButton.addEventListener('click', function() {
        // Get the date and address fields
        let date = document.getElementById("date");
        let address = document.getElementById("address");
      
        // Validate the date and address fields
        if (date.value.trim() === '') {
          alert('Please select a delivery date and time');
          return;
        }
        if (address.value.trim() === '') {
          alert('Please enter a delivery address');
          return;
        }
        
      
        // Create a flatpickr instance for the date field
        var flatpickrInstance = flatpickr(date, {
          enableTime: true,
          dateFormat: "Y-m-d\\TH:i:S"
        });
      
        // Get the selected date and time
        var selectedDateTime = flatpickrInstance.selectedDates[0];
        var selectedDateTimeStr = flatpickrInstance.formatDate(selectedDateTime, "Y-m-d\\TH:i:S");
        
      
        // Submit the order
        fetch("https://food-delivery.kreosoft.ru/api/order", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
            deliveryTime: selectedDateTimeStr,
            address: address.value
          })
        })
        .then(function(response) {
          let s = response.status;
          console.log(response);
          if (s == 200) {
            alert('Order confirmed!');
            location.reload();
            // window.location.replace("http://127.0.0.1:5500/Menu.html");
          } else {
            alert('Failed to confirm order');
            throw new Error('Failed to confirm order');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      });

      container.appendChild(totalDiv);
    });
  } else {
    alert('You need to Log in !!');
    window.location.replace("http://127.0.0.1:5500/Login.html");
    throw new Error('Failed to register');
  }
})
.catch(function(error) {
  console.log(error);
});