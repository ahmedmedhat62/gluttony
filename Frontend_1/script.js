
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://food-delivery.kreosoft.ru/api/dish?&page=1",
    "method": "GET",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    },
    
}
    let menu = document.getElementById("menu_cards");
    $.ajax(settings).done(function (response) 
    {
      let pages =  `${response.pagination.count}`;
      let pagination = document.createElement("div");
      let current_page = 1;
      pagination.classList.add('pagination');
      for(let j = 0; j<pages;j++){
        let page_button = document.createElement("button");
        page_button.innerText =  j+1;
        page_button.addEventListener('click', function(){
          // let page = j+1;
          current_page = j+1;
          showing_current_page(page_button.innerText);
        })
        pagination.appendChild(page_button);
       // console.log("a7a");
       menu.appendChild(pagination);
       
        
        
      }
      //showing_current_page(current_page);
         
        for(let i = 0; i<response.dishes.length;i++){
          let card_j = document.createElement("div");
          card_j.classList.add('card');
          card_j.addEventListener("mouseenter", function() {
            card_j.style.boxShadow = "10px 0px 10px 0px rgba(0,0,0,2)";
          });
          card_j.addEventListener("mouseleave", function() {
            card_j.style.boxShadow = "";
          });
         
          let card_t = document.createElement("h4");
          card_t.classList.add('text');
          let card_i = document.createElement("img");
          card_i.classList.add('image');
          let card_d = document.createElement("h2");
          card_d.classList.add('description');
          let card_c = document.createElement("h9");
          card_c.classList.add('category');
          let card_p = document.createElement("h4");
          card_p.classList.add('price');
          let card_r = document.createElement("h4");
         
          
          let card_v = document.createElement("img");
          card_v.classList.add('vegan');
          let card_b = document.createElement("button");
          card_b.classList.add('cart_btn');
          let v ;
          card_v.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
          let card_id = `${response.dishes[i].id}`;
          card_j.addEventListener('click',function(){
            console.log("a7a");
            fetch("https://food-delivery.kreosoft.ru/api/dish/"+card_id+"", {
                    method: "GET",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    
                  })
                  .then(function(response) {
                    if(response.status === 200) {
                     
                      return response.json();
                    } else {
                      throw new Error('Something went wrong');
                    }
                  })
                  .then(function(data) {
                    console.log(data);
                    const dishData = response.dishes[i];
                    const popup = window.open("", "Dish Details", "width=1000,height=1000");
                    const popupDocument = popup.document;
                    popupDocument.title = "Dish Details";
                    const container = popupDocument.createElement("div");
                    container.id = "dish_d";
                    popupDocument.body.appendChild(container);
                    const title = popupDocument.createElement("h4");
                    title.innerText = dishData.name;
                    container.appendChild(title);
                    const image = popupDocument.createElement("img");
                    image.classList.add("image");
                    image.src = dishData.image;
                    container.appendChild(image);
                    const description = popupDocument.createElement("h2");
                    description.innerText = dishData.description;
                    container.appendChild(description);
                    const category = popupDocument.createElement("h9");
                    category.innerText = `Dish Category - ${dishData.category}`;
                    container.appendChild(category);
                    const price = popupDocument.createElement("h4");
                    price.innerText = `Price - ${dishData.price}`;
                    container.appendChild(price);
                    const rating = popupDocument.createElement("h4");
                    rating.innerText = `Rating ${parseInt(dishData.rating)} / 10`;
                    container.appendChild(rating);
                    const vegan = popupDocument.createElement("img");
                    vegan.classList.add("vegan");
                    vegan.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
                    vegan.style.visibility = dishData.vegetarian === "false" ? "hidden" : "visible";
                    container.appendChild(vegan);
                   
                    const style = popupDocument.createElement("style");
                    style.innerText = `
                    * {
                      box-sizing: border-box;
                    }
                    body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #3d3c3c;
                    }
                    #dish_d {
                      padding: 20px;
                      background-color: #606060;
                      border: solid 2px rgba(255, 255, 255, 0.4);
                      border-radius: 12px;
                      color: white;
                    }
                    .image {
                      width: 100%;
                      height: 200px;
                      object-fit: cover;
                      margin-bottom: 10px;
                      border-radius: 8px;
                    }
                    .vegan {
                      width: 20px;
                      height: 20px;
                      margin-right: 5px;
                    }
                    .cart_btn {
                      background-color: #4CAF50;
                      color: white;
                      border: none;
                      padding: 10px;
                      border-radius: 5px;
                      cursor: pointer;
                      margin-top: 10px;
                    }
                  `;
                    popupDocument.head.appendChild(style);
                  });
                });
            card_b.addEventListener("click", myFunction);
            
                function myFunction() {
                  let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+card_id+"";
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
                        alert('Added to Cart !!') ;
                       
                        
                    } else {
                        alert('You need to Log in !!');
                        window.location.replace("http://127.0.0.1:5500/Login.html");
                        throw new Error('Failed to register');
                    }
                })
                                      }
          console.log(card_id);
          let r = `${response.dishes[i].rating}`;
          v = `${response.dishes[i].vegetarian}`;
          let a = v.toString();
          //console.log(response);
          card_r.innerText ="Rating " + ~~r + " / 10";
          card_p.innerText ="Price - " + `${response.dishes[i].price}`;
          card_t.innerText = `${response.dishes[i].name}`;
          card_c.innerText = "Dish Category - " + `${response.dishes[i].category}`;
          card_i.src = `${response.dishes[i].image}`;
          card_d.innerText = `${response.dishes[i].description}`;
          card_b.innerHTML = "add to cart";
          card_j.appendChild(card_v);
          card_j.appendChild(card_t);
          card_j.appendChild(card_i);
          card_j.appendChild(card_c);
          card_j.appendChild(card_d);
          card_j.appendChild(card_p);
          card_j.appendChild(card_r);
          card_j.appendChild(card_b);
          if (a === "false"){
           card_v.style.visibility = 'hidden';
          }
          menu.appendChild(card_j);

        }
        menu.appendChild(pagination);


    });
      
          
        
        
        
    
     function showing_current_page(cur_page){
      menu.innerHTML = "";
      current_page = cur_page;
      console.log(current_page);
      let url = "https://food-delivery.kreosoft.ru/api/dish?&page="+current_page+"";
      console.log(url);
      var settings2 = {
        "async": true,
        "crossDomain": true,
        'url': url,
        "method": "GET",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        
    }
    $.ajax(settings2).done(function (response) 
    {
      let pages =  `${response.pagination.count}`;
      let pagination = document.createElement("div");
      let current_page;
      pagination.classList.add('pagination');
      for(let j = 0; j<pages;j++){
        let page_button = document.createElement("button");
        page_button.innerText =  j+1;
        page_button.addEventListener('click', function(){
          let page = j+1;
          showing_current_page(page);
        })
        pagination.appendChild(page_button);
        console.log("a7a");
        
        
      }
         
        for(let i = 0; i<response.dishes.length;i++){
          let card_j = document.createElement("div");
          card_j.classList.add('card');
          let card_t = document.createElement("h4");
          card_t.classList.add('text');
          let card_i = document.createElement("img");
          card_i.classList.add('image');
          let card_d = document.createElement("h2");
          card_d.classList.add('description');
          let card_c = document.createElement("h9");
          card_c.classList.add('category');
          let card_p = document.createElement("h4");
          card_p.classList.add('price');
          let card_r = document.createElement("h4");
          card_r.classList.add('rate');
          let card_v = document.createElement("img");
          card_v.classList.add('vegan');
          let card_b = document.createElement("button");
          card_b.classList.add('cart_btn');
          let v ;
          card_v.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
          let card_id = `${response.dishes[i].id}`;
          card_j.addEventListener('click',function(){
            console.log("a7a");
            fetch("https://food-delivery.kreosoft.ru/api/dish/"+card_id+"", {
                    method: "GET",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    
                  })
                  .then(function(response) {
                    if(response.status === 200) {
                     
                      return response.json();
                    } else {
                      throw new Error('Something went wrong');
                    }
                  })
                  .then(function(data) {
                    console.log(data);
                    const dishData = response.dishes[i];
                    const popup = window.open("", "Dish Details", "width=1000,height=1000");
                    const popupDocument = popup.document;
                    popupDocument.title = "Dish Details";
                    const container = popupDocument.createElement("div");
                    container.id = "dish_d";
                    popupDocument.body.appendChild(container);
                    const title = popupDocument.createElement("h4");
                    title.innerText = dishData.name;
                    container.appendChild(title);
                    const image = popupDocument.createElement("img");
                    image.classList.add("image");
                    image.src = dishData.image;
                    container.appendChild(image);
                    const description = popupDocument.createElement("h2");
                    description.innerText = dishData.description;
                    container.appendChild(description);
                    const category = popupDocument.createElement("h9");
                    category.innerText = `Dish Category - ${dishData.category}`;
                    container.appendChild(category);
                    const price = popupDocument.createElement("h4");
                    price.innerText = `Price - ${dishData.price}`;
                    container.appendChild(price);
                    const rating = popupDocument.createElement("h4");
                    rating.innerText = `Rating ${parseInt(dishData.rating)} / 10`;
                    container.appendChild(rating);
                    const vegan = popupDocument.createElement("img");
                    vegan.classList.add("vegan");
                    vegan.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
                    vegan.style.visibility = dishData.vegetarian === "false" ? "hidden" : "visible";
                    container.appendChild(vegan);
                   
                    const style = popupDocument.createElement("style");
                    style.innerText = `
                    * {
                      box-sizing: border-box;
                    }
                    body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #3d3c3c;
                    }
                    #dish_d {
                      padding: 20px;
                      background-color: #606060;
                      border: solid 2px rgba(255, 255, 255, 0.4);
                      border-radius: 12px;
                      color: white;
                    }
                    .image {
                      width: 100%;
                      height: 200px;
                      object-fit: cover;
                      margin-bottom: 10px;
                      border-radius: 8px;
                    }
                    .vegan {
                      width: 20px;
                      height: 20px;
                      margin-right: 5px;
                    }
                    .cart_btn {
                      background-color: #4CAF50;
                      color: white;
                      border: none;
                      padding: 10px;
                      border-radius: 5px;
                      cursor: pointer;
                      margin-top: 10px;
                    }
                  `;
                    popupDocument.head.appendChild(style);
                  });
                });
          
            card_b.addEventListener("click", myFunction);

                function myFunction() {
                  let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+card_id+"";
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
                        alert('Added to Cart !!') ;
                       
                        
                    } else {
                        alert('You need to Log in !!');
                        window.location.replace("http://127.0.0.1:5500/Login.html");
                        throw new Error('Failed to register');
                    }
                })
                                      }
          let r = `${response.dishes[i].rating}`;
          v = `${response.dishes[i].vegetarian}`;
          let a = v.toString();
          //console.log(response);
          card_r.innerText ="Rating " + ~~r + " / 10";
          card_p.innerText ="Price - " + `${response.dishes[i].price}`;
          card_t.innerText = `${response.dishes[i].name}`;
          card_c.innerText = "Dish Category - " + `${response.dishes[i].category}`;
          card_i.src = `${response.dishes[i].image}`;
          card_d.innerText = `${response.dishes[i].description}`;
          card_b.innerHTML = "add to cart";
          card_j.appendChild(card_v);
          card_j.appendChild(card_t);
          card_j.appendChild(card_i);
          card_j.appendChild(card_c);
          card_j.appendChild(card_d);
          card_j.appendChild(card_p);
          card_j.appendChild(card_r);
          card_j.appendChild(card_b);
          if (a === "false"){
           card_v.style.visibility = 'hidden';
          }
          menu.appendChild(card_j);

        }
        menu.appendChild(pagination);
        
       
        
        
    });

    
    

      
    
    

  };
  const applyFiltersButton = document.getElementById("apply-filters-button");
  applyFiltersButton.addEventListener("click", () => {
  let fmenu = document.getElementById("menu_cards");
  fmenu.innerHTML = ""; 
  
  const isVeganOnly = document.getElementById("customSwitches").checked;
  const mySelect = document.getElementById("my-select");
  const mySelect2 = document.getElementById("my-select2");
  const selectedValue = mySelect.value;
  const selectedValue2 = mySelect2.value;
  console.log(selectedValue);
  console.log(selectedValue2);
  let url = "https://food-delivery.kreosoft.ru/api/dish?";
  if (selectedValue) {
    url += "categories=" + selectedValue + "&";
  }
  if (isVeganOnly) {
    url += "vegetarian=true&";
  }
  if (selectedValue2) {
    url += "sorting=" + selectedValue2 + "&";
  }
 
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,//"https://food-delivery.kreosoft.ru/api/dish?categories="+selectedValue+"&vegetarian="+isVeganOnly+"&sorting="+selectedValue2+"&page=1",
    "method": "GET",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    },
    
}
    let menu = document.getElementById("menu_cards");
    $.ajax(settings).done(function (response) 
    {
      let pages =  `${response.pagination.count}`;
      let pagination = document.createElement("div");
      let current_page = 1;
      pagination.classList.add('pagination');
      for(let j = 0; j<pages;j++){
        let page_button = document.createElement("button");
        page_button.innerText =  j+1;
        page_button.addEventListener('click', function(){
          // let page = j+1;
          current_page = j+1;
          showing_current_page(page_button.innerText);
        })
        pagination.appendChild(page_button);
       // console.log("a7a");
       menu.appendChild(pagination);
       
        
        
      }
      //showing_current_page(current_page);
         
        for(let i = 0; i<response.dishes.length;i++){
          let card_j = document.createElement("div");
          card_j.classList.add('card');
          card_j.addEventListener("mouseenter", function() {
            console.log("aa")
            card_j.style.boxShadow = "10px 0px 10px 0px rgba(0,0,0,2)";
          });
          card_j.addEventListener("mouseleave", function() {
            card_j.style.boxShadow = "";
          });
         
          let card_t = document.createElement("h4");
          card_t.classList.add('text');
          let card_i = document.createElement("img");
          card_i.classList.add('image');
          let card_d = document.createElement("h2");
          card_d.classList.add('description');
          let card_c = document.createElement("h9");
          card_c.classList.add('category');
          let card_p = document.createElement("h4");
          card_p.classList.add('price');
          let card_r = document.createElement("h4");
          card_r.classList.add('rate');
          let card_v = document.createElement("img");
          card_v.classList.add('vegan');
          let card_b = document.createElement("button");
          card_b.classList.add('cart_btn');
          let v ;
          card_v.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
          let card_id = `${response.dishes[i].id}`;
          card_j.addEventListener('click',function(){
            console.log("a7a");
            fetch("https://food-delivery.kreosoft.ru/api/dish/"+card_id+"", {
                    method: "GET",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    
                  })
                  .then(function(response) {
                    if(response.status === 200) {
                     
                      return response.json();
                    } else {
                      throw new Error('Something went wrong');
                    }
                  })
                  .then(function(data) {
                    console.log(data);
                    const dishData = response.dishes[i];
                    const popup = window.open("", "Dish Details", "width=1000,height=1000");
                    const popupDocument = popup.document;
                    popupDocument.title = "Dish Details";
                    const container = popupDocument.createElement("div");
                    container.id = "dish_d";
                    popupDocument.body.appendChild(container);
                    const title = popupDocument.createElement("h4");
                    title.innerText = dishData.name;
                    container.appendChild(title);
                    const image = popupDocument.createElement("img");
                    image.classList.add("image");
                    image.src = dishData.image;
                    container.appendChild(image);
                    const description = popupDocument.createElement("h2");
                    description.innerText = dishData.description;
                    container.appendChild(description);
                    const category = popupDocument.createElement("h9");
                    category.innerText = `Dish Category - ${dishData.category}`;
                    container.appendChild(category);
                    const price = popupDocument.createElement("h4");
                    price.innerText = `Price - ${dishData.price}`;
                    container.appendChild(price);
                    const rating = popupDocument.createElement("h4");
                    rating.innerText = `Rating ${parseInt(dishData.rating)} / 10`;
                    container.appendChild(rating);
                    const vegan = popupDocument.createElement("img");
                    vegan.classList.add("vegan");
                    vegan.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
                    vegan.style.visibility = dishData.vegetarian === "false" ? "hidden" : "visible";
                    container.appendChild(vegan);
                   
                    const style = popupDocument.createElement("style");
                    style.innerText = `
                    * {
                      box-sizing: border-box;
                    }
                    body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #3d3c3c;
                    }
                    #dish_d {
                      padding: 20px;
                      background-color: #606060;
                      border: solid 2px rgba(255, 255, 255, 0.4);
                      border-radius: 12px;
                      color: white;
                    }
                    .image {
                      width: 100%;
                      height: 200px;
                      object-fit: cover;
                      margin-bottom: 10px;
                      border-radius: 8px;
                    }
                    .vegan {
                      width: 20px;
                      height: 20px;
                      margin-right: 5px;
                    }
                    .cart_btn {
                      background-color: #4CAF50;
                      color: white;
                      border: none;
                      padding: 10px;
                      border-radius: 5px;
                      cursor: pointer;
                      margin-top: 10px;
                    }
                  `;
                    popupDocument.head.appendChild(style);
                  });
                });
            card_b.addEventListener("click", myFunction);
            
                function myFunction() {
                  let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+card_id+"";
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
                        alert('Added to Cart !!') ;
                       
                        
                    } else {
                        alert('You need to Log in !!');
                        window.location.replace("http://127.0.0.1:5500/Login.html");
                        throw new Error('Failed to register');
                    }
                })
                                      }
          console.log(card_id);
          let r = `${response.dishes[i].rating}`;
          v = `${response.dishes[i].vegetarian}`;
          let a = v.toString();
          //console.log(response);
          card_r.innerText ="Rating " + ~~r + " / 10";
          card_p.innerText ="Price - " + `${response.dishes[i].price}`;
          card_t.innerText = `${response.dishes[i].name}`;
          card_c.innerText = "Dish Category - " + `${response.dishes[i].category}`;
          card_i.src = `${response.dishes[i].image}`;
          card_d.innerText = `${response.dishes[i].description}`;
          card_b.innerHTML = "add to cart";
          card_j.appendChild(card_v);
          card_j.appendChild(card_t);
          card_j.appendChild(card_i);
          card_j.appendChild(card_c);
          card_j.appendChild(card_d);
          card_j.appendChild(card_p);
          card_j.appendChild(card_r);
          card_j.appendChild(card_b);
          if (a === "false"){
           card_v.style.visibility = 'hidden';
          }
          menu.appendChild(card_j);

        }
        menu.appendChild(pagination);


    });
    function showing_current_page(cur_page){
      menu.innerHTML = "";
      current_page = cur_page;
      console.log(current_page);
      let url = "https://food-delivery.kreosoft.ru/api/dish?";
      if (selectedValue) {
        url += "categories=" + selectedValue + "&";
      }
      if (isVeganOnly) {
        url += "vegetarian=true&";
      }
      if (selectedValue2) {
        url += "sorting=" + selectedValue2 + "&";
      }
      url += "page=" + current_page;
      //let url = "https://food-delivery.kreosoft.ru/api/dish?categories="+selectedValue+"&vegetarian="+isVeganOnly+"&sorting="+selectedValue2+"&page="+current_page+"";
      console.log(url);
      var settings2 = {
        "async": true,
        "crossDomain": true,
        'url': url,
        "method": "GET",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        
    }
    $.ajax(settings2).done(function (response) 
    {
      let pages =  `${response.pagination.count}`;
      let pagination = document.createElement("div");
      let current_page;
      pagination.classList.add('pagination');
      for(let j = 0; j<pages;j++){
        let page_button = document.createElement("button");
        page_button.innerText =  j+1;
        page_button.addEventListener('click', function(){
          let page = j+1;
          showing_current_page(page);
        })
        pagination.appendChild(page_button);
        console.log("a7a");
        
        
      }
         
        for(let i = 0; i<response.dishes.length;i++){
          let card_j = document.createElement("div");
          card_j.classList.add('card');
          let card_t = document.createElement("h4");
          card_t.classList.add('text');
          let card_i = document.createElement("img");
          card_i.classList.add('image');
          let card_d = document.createElement("h2");
          card_d.classList.add('description');
          let card_c = document.createElement("h9");
          card_c.classList.add('category');
          let card_p = document.createElement("h4");
          card_p.classList.add('price');
          let card_r = document.createElement("h4");
          card_r.classList.add('rate');
          let card_v = document.createElement("img");
          card_v.classList.add('vegan');
          let card_b = document.createElement("button");
          card_b.classList.add('cart_btn');
          let v ;
          card_v.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
          let card_id = `${response.dishes[i].id}`;
          card_j.addEventListener('click',function(){
            console.log("a7a");
            fetch("https://food-delivery.kreosoft.ru/api/dish/"+card_id+"", {
                    method: "GET",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    
                  })
                  .then(function(response) {
                    if(response.status === 200) {
                     
                      return response.json();
                    } else {
                      throw new Error('Something went wrong');
                    }
                  })
                  .then(function(data) {
                    console.log(data);
                    const dishData = response.dishes[i];
                    const popup = window.open("", "Dish Details", "width=1000,height=1000");
                    const popupDocument = popup.document;
                    popupDocument.title = "Dish Details";
                    const container = popupDocument.createElement("div");
                    container.id = "dish_d";
                    popupDocument.body.appendChild(container);
                    const title = popupDocument.createElement("h4");
                    title.innerText = dishData.name;
                    container.appendChild(title);
                    const image = popupDocument.createElement("img");
                    image.classList.add("image");
                    image.src = dishData.image;
                    container.appendChild(image);
                    const description = popupDocument.createElement("h2");
                    description.innerText = dishData.description;
                    container.appendChild(description);
                    const category = popupDocument.createElement("h9");
                    category.innerText = `Dish Category - ${dishData.category}`;
                    container.appendChild(category);
                    const price = popupDocument.createElement("h4");
                    price.innerText = `Price - ${dishData.price}`;
                    container.appendChild(price);
                    const rating = popupDocument.createElement("h4");
                    rating.innerText = `Rating ${parseInt(dishData.rating)} / 10`;
                    container.appendChild(rating);
                    const vegan = popupDocument.createElement("img");
                    vegan.classList.add("vegan");
                    vegan.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vegan_friendly_icon.svg/1200px-Vegan_friendly_icon.svg.png";
                    vegan.style.visibility = dishData.vegetarian === "false" ? "hidden" : "visible";
                    container.appendChild(vegan);
                   
                    const style = popupDocument.createElement("style");
                    style.innerText = `
                    * {
                      box-sizing: border-box;
                    }
                    body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #3d3c3c;
                    }
                    #dish_d {
                      padding: 20px;
                      background-color: #606060;
                      border: solid 2px rgba(255, 255, 255, 0.4);
                      border-radius: 12px;
                      color: white;
                    }
                    .image {
                      width: 100%;
                      height: 200px;
                      object-fit: cover;
                      margin-bottom: 10px;
                      border-radius: 8px;
                    }
                    .vegan {
                      width: 20px;
                      height: 20px;
                      margin-right: 5px;
                    }
                    .cart_btn {
                      background-color: #4CAF50;
                      color: white;
                      border: none;
                      padding: 10px;
                      border-radius: 5px;
                      cursor: pointer;
                      margin-top: 10px;
                    }
                  `;
                    popupDocument.head.appendChild(style);
                  });
                });
          
            card_b.addEventListener("click", myFunction);

                function myFunction() {
                  let url2 = "https://food-delivery.kreosoft.ru/api/basket/dish/"+card_id+"";
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
                        alert('Added to Cart !!') ;
                       
                        
                    } else {
                        alert('You need to Log in !!');
                        window.location.replace("http://127.0.0.1:5500/Login.html");
                        throw new Error('Failed to register');
                    }
                })
                                      }
          let r = `${response.dishes[i].rating}`;
          v = `${response.dishes[i].vegetarian}`;
          let a = v.toString();
          //console.log(response);
          card_r.innerText ="Rating " + ~~r + " / 10";
          card_p.innerText ="Price - " + `${response.dishes[i].price}`;
          card_t.innerText = `${response.dishes[i].name}`;
          card_c.innerText = "Dish Category - " + `${response.dishes[i].category}`;
          card_i.src = `${response.dishes[i].image}`;
          card_d.innerText = `${response.dishes[i].description}`;
          card_b.innerHTML = "add to cart";
          card_j.appendChild(card_v);
          card_j.appendChild(card_t);
          card_j.appendChild(card_i);
          card_j.appendChild(card_c);
          card_j.appendChild(card_d);
          card_j.appendChild(card_p);
          card_j.appendChild(card_r);
          card_j.appendChild(card_b);
          if (a === "false"){
           card_v.style.visibility = 'hidden';
          }
          menu.appendChild(card_j);

        }
        menu.appendChild(pagination);
        
       
        
        
    });

    
    

      
    
    

  };

 
  
  console.log("Vegan only:", isVeganOnly);
});