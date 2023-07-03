let createOrderBtn = document.getElementById('create-order-btn');

createOrderBtn.addEventListener('click', function() {
 
    window.location.replace("http://127.0.0.1:5500/Create_order.html");
});


fetch("https://food-delivery.kreosoft.ru/api/order",{
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
        let container = document.getElementById("container");
        let heading = document.createElement("h1");
        heading.classList.add('text-center','fw-normal', 'mb-0', 'text-black');
        heading.innerText = "Your Orders";
        container.appendChild(heading);

        for(let i = 0; i<data.length;i++){
          let card = document.createElement("div");
          card.classList.add('card', 'rounded-3', 'mb-4');
          let modal = document.getElementById("myModal");
          let order_id_element = document.getElementById("order_id");
          let details_element = document.querySelector(".card-body .mb-3");
          let items_list = document.querySelector(".items-list tbody");

// Add a click event listener to the card
card.addEventListener("click", function() {
  // Get the URL for the order API endpoint
  let url2 = "https://food-delivery.kreosoft.ru/api/order/"+data[i].id+"";
  
  // Fetch the order data using the URL and authorization headers
  fetch(url2,{
    method : 'GET',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization : 'Bearer ' + localStorage.getItem('token')
    },
  })
  .then(function(response) {
    let s = response.status;
    if (s == 200) {
      // Parse the response JSON data
      response.json().then(function(data) {
        console.log(data);
        
        // Set the order information
        order_id_element.innerHTML = "Order #" + data.id;
        
        let details_html = `
          <div>
            <h6 class="small mb-0">Delivery Address:</h6>
            <p class="small">${data.address}</p>
          </div>
          <div>
            <h6 class="small mb-0">Delivery Time:</h6>
            <p class="small">${data.deliveryTime}</p>
          </div>
          <div>
            <h6 class="small mb-0">Order Time:</h6>
            <p class="small">${data.orderTime}</p>
          </div>
          <div>
            <h6 class="small mb-0">Total Price:</h6>
            <p class="small">$${data.price}</p>
          </div>
          <div>
            <h6 class="small mb-0">Status:</h6>
            <p class="small">${data.status}</p>
          </div>
        `;
        details_element.innerHTML = details_html;
        
        // Loop through the dishes and add them to the items list
        let items_html = "";
        for (let i = 0; i < data.dishes.length; i++) {
          let dish_name = data.dishes[i].name;
          let dish_price = data.dishes[i].price;
          let dish_total_price = data.dishes[i].totalPrice;
          let dish_image = data.dishes[i].image;
          let dish_amount = data.dishes[i].amount;

          items_html += `
            <tr>
              <td>
                <div class="d-flex mb-2">
                  <div class="flex-shrink-0">
                    <img src="${dish_image}" alt="" width="35" class="img-fluid">
                  </div>
                  <div class="flex-lg-grow-1 ms-3">
                    <h6 class="small mb-0"><a href="#" class="text-reset">${dish_name}</a></h6>
                    <span class="small">Price: $${dish_price}</span>
                  </div>
                </div>
              </td>
              <td>${dish_amount}</td>
              <td class="text-end">$${dish_total_price}</td>
            </tr>
          `;
        }
        items_list.innerHTML = items_html;
      })
      
      // Display the modal
      modal.style.display = "block";
    } 
  })
});
          let closeButton = document.getElementsByClassName("close")[0];
          closeButton.addEventListener("click", function() {
          let modal = document.getElementById("myModal");
          modal.style.display = "none";
          });
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

          let textDiv = document.createElement("div");
          textDiv.classList.add('col-md-3', 'col-lg-3', 'col-xl-3');
          row.appendChild(textDiv);

          let orderTime = document.createElement("p");
          orderTime.classList.add('lead', 'fw-normal', 'mb-2');
          orderTime.innerText = `Order From ${data[i].orderTime.substr(0, 10)}`;
          textDiv.appendChild(orderTime);

          
          let order_status = document.createElement("p");
          order_status.classList.add('mb-0', 'fw-light');
          order_status.innerText = `Status: ${data[i].status}`;
          textDiv.appendChild(order_status);

          let priceDiv = document.createElement("div");
          priceDiv.classList.add('col-md-3', 'col-lg-2', 'col-xl-2');
          row.appendChild(priceDiv);

          
          let pricePara = document.createElement("p");
          pricePara.classList.add('mb-2', 'fw-light');
          pricePara.innerText = `Total Order Cost: ${data[i].price}`;
          priceDiv.appendChild(pricePara);

          
          let delivery_date = document.createElement("p");
          delivery_date.classList.add('mb-0', 'fw-light');
          let deliveryTime = data[i].deliveryTime;
          let datePart = deliveryTime.substr(0, 10);
          let timePart = deliveryTime.substr(11, 5);
          delivery_date.innerText = `Delivery Time: ${datePart} ${timePart}`;
          priceDiv.appendChild(delivery_date);

          let quantityDiv = document.createElement("div");
          quantityDiv.classList.add('col-md-3', 'col-lg-3', 'col-xl-2', 'd-flex');
          row.appendChild(quantityDiv);

          
          if (data[i].status === "InProcess") {
            let confirmButton = document.createElement("button");
            confirmButton.classList.add('btn', 'btn-primary');
            confirmButton.innerText = 'Confirm Delivery';
            quantityDiv.appendChild(confirmButton);

            // Add an event listener for the "click" event on the confirmButton
            confirmButton.addEventListener("click", function() {
              let url2 = "https://food-delivery.kreosoft.ru/api/order/"+data[i].id+"/status";
              fetch(url2,{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({status: 'Delivered'})
              })
              .then(function(response) {
                let s = response.status;
                if (s == 200) {
                  alert('Order Confirmed !!') ;
                  order_status.innerText = "Status: Delivered";
                  confirmButton.remove();
                } 
              })
              
            });
          }
          card.addEventListener("mouseenter", function() {
            card.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.3)";
          });
          card.addEventListener("mouseleave", function() {
            card.style.boxShadow = "";
          });

          container.appendChild(card);
      }
    })
   
  })
  