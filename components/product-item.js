// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {

    var data = JSON.parse(this.getAttribute("data"));
    
    this.attachShadow({mode: 'open'});

    var wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'product');

    var img =  wrapper.appendChild (document.createElement ('img'));
    img.width = 200;   
    if (this.hasAttribute('data')) {
      img.src = data.image;
      img.alt = data.title;
    }

    var title = wrapper.appendChild (document.createElement('span'));

    title.setAttribute('class','title');
    if (this.hasAttribute('data')) {
       title.textContent = data.title;
    }

    var price = wrapper.appendChild (document.createElement('span'));
    price.setAttribute('class','price');
    if (this.hasAttribute('data')) {
       price.textContent = "$ " + data.price;
    }

    var button = wrapper.appendChild (document.createElement('button'));
    
    button.onclick = function () {
    
      var num = document.getElementById("cart-count");

      if (button.textContent == "Add to Cart") {
        
        button.textContent = "Remove from Cart";
        num.textContent = (parseInt(num.textContent) + 1).toString();
        localStorage.setItem(data.id, "no");
        
      } else {
        var num = document.getElementById("cart-count");
        button.textContent = "Add to Cart";
        num.textContent = (parseInt(num.textContent) - 1).toString();
        localStorage.setItem(data.id, "yes");
      }

      localStorage.setItem("count", num.textContent);
    
    }
    
    if (localStorage.getItem(data.id) != null) {

      if (localStorage.getItem(data.id) == "yes") {
        button.textContent = "Add to Cart";

      } else {
        button.textContent = "Remove from Cart";
      }

    } else {
       button.textContent = "Add to Cart";
    } 

    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    this.shadowRoot.append(style, wrapper);
    
  }
}

customElements.define('product-item', ProductItem);