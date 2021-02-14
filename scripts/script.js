// Script.js

window.addEventListener('DOMContentLoaded', () => {
  //localStorage.clear();
  if (localStorage.getItem("count") != null) {
     var num = document.getElementById("cart-count");
     num.textContent = localStorage.getItem("count");
  } 

  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {

      localStorage.setItem("data", data);
      var list = document.getElementById("product-list");

      for (var i = 0; i < data.length; i++) {
          var item = document.createElement("product-item");
          item.setAttribute('data', JSON.stringify(data[i]));
          list.appendChild(item);
      }
    })

});