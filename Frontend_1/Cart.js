
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
        let priceDiv = document.createElement("div");
        priceDiv.classList.add('col-md-3', 'col-lg-2', 'col-xl-2');
        row.appendChild(priceDiv);
        
        // Create a paragraph element to display the price
        let pricePara = document.createElement("p");
        pricePara.classList.add('mb-0', 'fw-light');
        pricePara.innerText = `Total: ${data[i].totalPrice}`;
        priceDiv.appendChild(pricePara);
        let quantityDiv = document.createElement("div");
        quantityDiv.classList.add('col-md-3', 'col-lg-3', 'col-xl-2', 'd-flex');
        row.appendChild(quantityDiv);

        let quantityInput = document.createElement("input");
        quantityInput.classList.add('form-control', 'form-control-sm');
        quantityInput.type = 'number';
        quantityInput.min = '0';
        quantityInput.name = 'quantity';
        quantityInput.value = `${data[i].amount}`;
        quantityInput.addEventListener('change', function() {
          let dishId = data[i].id; // Get the ID of the dish
          let valueChange = this.value - data[i].amount; // Calculate the change in quantity
          if (valueChange > 0) {
            let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+dishId+"";
            fetch(url2,{
              method : 'POST',
              headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem('token')
              },
            })
            .then(function(response) {
              let s = response.status;
              console.log(response);
              if (s == 200) {
                let a = data[i].totalPrice + data[i].price * valueChange ; // Update the total price using the value change
                console.log(a);
                pricePara.innerText = "Total: " + a ;
                alert(`Quantity increased by ${valueChange} for dish ID: ${dishId}`); // Display an alert message for positive change
              } else {
                alert('Failed');
              }
            })
          } else if (valueChange < 0) {
            let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+dishId+"?increase=true";
            fetch(url2,{
              method : 'DELETE',
              headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem('token')
              },
            })
            .then(function(response) {
              let s = response.status;
              console.log(response);
              if (s == 200) {
                let a = data[i].totalPrice - data[i].price * Math.abs(valueChange); // Update the total price using the absolute value of the value change
                console.log(a);
                pricePara.innerText = "Total: " + a ;
                alert(`Quantity decreased by ${-valueChange} for dish ID: ${dishId}`); // Display an alert message for negative change
              } else {
                alert('Failed');
              }
            })
          } else {
            let a = data[i].totalPrice  // Update the total price using the absolute value of the value change
                console.log(a);
                pricePara.innerText = "Total: " + a ;
            alert(`Quantity unchanged for dish ID: ${dishId}`); // Display an alert message for no change
          }
        });
        quantityDiv.appendChild(quantityInput);
        let deleteDiv = document.createElement("div");
        deleteDiv.classList.add('col-md-1', 'col-lg-1', 'col-xl-1', 'text-end');
        row.appendChild(deleteDiv);

        let deleteBtn = document.createElement("a");
        deleteBtn.href = '#!';
        deleteBtn.classList.add('text-danger');
        deleteBtn.innerHTML = '<i class="fas fa-trash fa-lg"></i>';
        deleteDiv.appendChild(deleteBtn);

        let removeBtn = document.createElement("button");
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', function() {
          let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+data[i].id+"?increase=false";
            fetch(url2,{
              method : 'DELETE',
              headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem('token')
              },
            })
            .then(function(response) {
              let s = response.status;
              console.log(response);
              if (s == 200) {
                
                alert("Quantity is Zero"); // Display an alert message for positive change
              } else {
                alert('Failed');
              }
            })
        card.remove();
      });
        deleteDiv.appendChild(removeBtn);
        container.appendChild(card);
      }
    });
  } else {
    alert('You need to Log in !!');
    window.location.replace("http://127.0.0.1:5500/Login.html");
    throw new Error('Failed to register');
  }
})